import React, { useState } from "react";
import axios from "axios";

const DateWiseOrders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const fetchOrders = async () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/api/admin/orders-history?date=${selectedDate}`);
      setOrders(Array.isArray(res.data) ? res.data : []); // <-- Use res.data directly
      setError("");
    } catch (err) {
      console.error("Error fetching orders", err);
      setError("Failed to load order history");
      setOrders([]);
    }
  };

  return (
    <div
      className="min-h-screen flex items-top justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(228,113,4,1), rgba(193,4,34,1))",
      }}
    >
      <div
        className="p-8 rounded-xl shadow-xl w-full max-w-4xl"
        style={{
          background: "rgba(248,248,248,1)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "rgba(0,0,0,1)" }}
        >
          Date-wise Orders History
        </h2>

        <div className="flex gap-4 mb-4 items-center">
          <input
            type="date"
            className="p-2 border rounded"
            style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(228,113,4,1)" }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={fetchOrders}
            className="px-4 py-2 rounded font-bold"
            style={{
              background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
              color: "rgba(248,248,248,1)",
            }}
          >
            Fetch History
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {orders.length > 0 ? (
          <table className="w-full border mt-4 text-left">
            <thead>
              <tr style={{ background: "rgba(228,113,4,0.2)" }}>
                <th className="p-2" style={{ color: "rgba(0,0,0,1)" }}>Employee ID</th>
                <th className="p-2" style={{ color: "rgba(0,0,0,1)" }}>Item Name</th>
                <th className="p-2" style={{ color: "rgba(0,0,0,1)" }}>Item Quantity</th>
                <th className="p-2" style={{ color: "rgba(0,0,0,1)" }}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2" style={{ color: "rgba(0,0,0,1)" }}>{order.employee_id}</td>
                  <td className="p-2" style={{ color: "rgba(0,0,0,1)" }}>{order.item_name}</td>
                  <td className="p-2" style={{ color: "rgba(0,0,0,1)" }}>{order.quantity}</td>
                  <td className="p-2" style={{ color: "rgba(0,0,0,1)" }}>₹{order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4" style={{ color: "rgba(0,0,0,1)" }}>No orders found for the selected date</p>
        )}
      </div>
    </div>
  );
};

export default DateWiseOrders;
