import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getEmployeeName, getVendors, getMenuItems, getCutoffTimes, placeOrder,getCanteenClosedDates
} from './api/api'; 
import Header from './components/Header';
import MealAndDateSelector from './components/MealAndDateSelector';
import VendorList from './components/VendorList';
import MenuItems from './components/MenuItems';
import OrderButton from './components/OrderButton';
import OrderSummary from './components/OrderSummary';

const DashboardPage = () => {
   const navigate = useNavigate();
  const employeeId = localStorage.getItem('employeeId');
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name;
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];

  const [employeeName, setEmployeeName] = useState('');
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState('');
  const [mealType, setMealType] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderDate, setOrderDate] = useState(today);
  const [errors, setErrors] = useState({});
  const [cutoffTimes, setCutoffTimes] = useState({ lunchCutoff: '10:00', dinnerCutoff: '16:00' });
  const [isCanteenClosed, setIsCanteenClosed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
const [orderSummary, setOrderSummary] = useState(null);

useEffect(() => {
  getCanteenClosedDates().then((dates) => {
    console.log("Closed Dates API response =", dates);
    const today = new Date().toISOString().split('T')[0];
    if (Array.isArray(dates)) {
      setIsCanteenClosed(dates.includes(today));
    } else {
      console.error("Expected an array but got:", dates);
    }
  });
}, []);


  useEffect(() => {
    if (employeeId) {
      getEmployeeName(employeeId).then((res) => setEmployeeName(res.data.name)).catch(console.error);
    }
    getVendors().then((res) => setVendors(res.data)).catch(console.error);
    getCutoffTimes().then((res) => setCutoffTimes(res.data)).catch(console.error);
  }, [employeeId]);

  useEffect(() => {
    if (vendorId && mealType) {
      getMenuItems(vendorId, mealType).then((res) => setMenuItems(res.data)).catch(console.error);
    } else {
      setMenuItems([]);
    }
  }, [vendorId, mealType]);

  useEffect(() => {
    const errs = {};
    if (!mealType) errs.mealType = 'Select a meal type';
    if (!orderDate) errs.orderDate = 'Select a date';
    if (!vendorId) errs.vendorId = 'Choose a vendor';
    if (selectedItems.length === 0) errs.selectedItems = 'Select at least one item';
    setErrors(errs);
  }, [mealType, orderDate, vendorId, selectedItems]);

  const toggleItem = (item) => {
    setSelectedItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      return found
        ? prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }];
    });
  };


  const removeItem = (item) => {
    setSelectedItems((prev) =>
      prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i).filter((i) => i.quantity > 0)
    );
  };

  const calculateTotal = () =>
    selectedItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const handleOrder = (e) => {
    e.preventDefault();
  console.log("handleOrder called");
  console.log("isCanteenClosed =", isCanteenClosed);

  if (isCanteenClosed) {
    return alert("Canteen is closed on the selected date.");
  }

  const now = new Date();
  const [lh, lm] = cutoffTimes.lunchCutoff.split(':').map(Number);
  const [dh, dm] = cutoffTimes.dinnerCutoff.split(':').map(Number);

  const lunchCutoff = new Date().setHours(lh, lm, 0, 0);
  const dinnerCutoff = new Date().setHours(dh, dm, 0, 0);

  const isValid =
    (mealType === 'Lunch' && now < lunchCutoff) ||
    (mealType === 'Dinner' && now < dinnerCutoff);

  if (!isValid) return alert(`${mealType} order cutoff time has passed.`);

  const summary = {
    orderNo: Math.floor(100000 + Math.random() * 900000),
    date: today,
    meal_type: mealType,
    items: selectedItems.map((i) => ({ menu_item: i.menu_item, quantity: i.quantity })),
    total: calculateTotal(),
  };

  //const token = localStorage.getItem('token');
  const token = sessionStorage.getItem('token');
  placeOrder({ employeeId, ...summary }, token)
  .then(() => {
    setOrderSummary(summary);
    setShowSummary(true);
    setSelectedItems([]);
  })
  .catch((err) =>
    alert(err.response?.data?.message || 'Order failed')
  );

  setSelectedItems([]);
};

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <Header name={name || employeeName} onLogout={() => { localStorage.clear(); window.location.href = '/login'; }} onOrderHistory={() => { window.location.href = '/orderHistory'; }} />
        <MealAndDateSelector {...{ mealType, setMealType, orderDate, setOrderDate, today, errors }} />
        <VendorList {...{ vendors, vendorId, setVendorId, errors }} />
        {menuItems.length > 0 && <MenuItems {...{ menuItems, selectedItems, toggleItem, removeItem, errors }} />}
        {console.log("errors =", errors)}
        <OrderButton handleOrder={handleOrder} hasErrors={Object.keys(errors).length > 0} />
            <OrderSummary
  showSummary={showSummary}
  setShowSummary={setShowSummary}
  orderSummary={orderSummary}
/>
      </div>
    </div>
  );
};

export default DashboardPage;
