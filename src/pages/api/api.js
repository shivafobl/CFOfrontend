import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
// const BASE_URL = 'https://bc1c-2401-4900-88e4-2ee2-d995-9d72-d88d-b1b5.ngrok-free.app/api';
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getEmployeeName = (id) =>
  axios.get(`${BASE_URL}/api/employees/${id}`);

export const getVendors = () =>
  axios.get(`${BASE_URL}/api/vendors`);

export const getMenuItems = (vendorId, mealType) =>
  axios.get(`${BASE_URL}/api/menus?vendor_id=${vendorId}&meal_type=${mealType}`);

export const getCutoffTimes = () =>
  axios.get(`${BASE_URL}/api/orders/cutoff-times`);

export const getCanteenClosedDates = () =>
  axios.get(`${BASE_URL}/api/orders/canteen-closed-dates`);

export const placeOrder = (order, token) =>
  axios.post(`${BASE_URL}/api/orders`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
