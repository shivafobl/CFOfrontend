const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'CFO2',
  password: 'password',
  port: 5432,
});

client.connect();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Query and send email
const sendVendorEmails = async (mealType) => {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const query = `
    SELECT v.email AS vendor_email, v.name AS vendor_name, mi.menu_item, SUM(oi.quantity) AS total_quantity
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN menu_items mi ON oi.menu_item_id = mi.id
    JOIN vendors v ON mi.vendor_id = v.id
    WHERE o.date = $1 AND o.meal_type = $2
    GROUP BY v.email, v.name, mi.menu_item
    ORDER BY v.email;
  `;

  const result = await client.query(query, [date, mealType]);

  const grouped = {};
  for (const row of result.rows) {
    if (!grouped[row.vendor_email]) {
      grouped[row.vendor_email] = {
        vendor_name: row.vendor_name,
        items: [],
      };
    }
    grouped[row.vendor_email].items.push(`${row.menu_item} - ${row.total_quantity}`);
  }

  // Send emails
  for (const email in grouped) {
    const { vendor_name, items } = grouped[email];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `CFO ${mealType} Order Summary - ${date}`,
      text: `Dear ${vendor_name},\n\nHere is the list of items to supply for ${mealType}:\n\n${items.join(
        '\n'
      )}\n\nRegards,\nCFO Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    } catch (err) {
      console.error(`Error sending email to ${email}:`, err.message);
    }
  }
};

// Cron jobs
cron.schedule('0 10 * * *', () => sendVendorEmails('Lunch'));  // 10:00 AM
cron.schedule('0 16 * * *', () => sendVendorEmails('Dinner')); // 4:00 PM

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
