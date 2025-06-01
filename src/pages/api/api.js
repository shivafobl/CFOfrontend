import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getEmployeeName = (id) =>
  axios.get(`${BASE_URL}/employees/${id}`);

export const getVendors = () =>
  axios.get(`${BASE_URL}/vendors`);

export const getMenuItems = (vendorId, mealType) =>
  axios.get(`${BASE_URL}/menus?vendor_id=${vendorId}&meal_type=${mealType}`);

export const getCutoffTimes = () =>
  axios.get(`${BASE_URL}/orders/cutoff-times`);

export const getCanteenClosedDates = () =>
  axios.get(`${BASE_URL}/orders/canteen-closed-dates`);

export const placeOrder = (order, token) =>
  axios.post(`${BASE_URL}/orders`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
