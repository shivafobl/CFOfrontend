import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Import custom components
import Header from './Header'; 
import SelectionRow from './SelectionRow'; // Adjust the path as necessary
import VendorSelection from './VendorSelection'; // Adjust the path as necessary
import MenuItems from './MenuItems'; // Adjust the path as necessary
import OrderSummary from './OrderSummary'; // Adjust the path as necessary


const DashboardPage = () => {
  const employeeId = localStorage.getItem('employeeId');
  const user = JSON.parse(localStorage.getItem('user'));
  const name = user?.name;
  const today = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().split("T")[0];

  const [employeeName, setEmployeeName] = useState('');
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState('');
  const [mealType, setMealType] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderDate, setOrderDate] = useState(today);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [cutoffTimes, setCutoffTimes] = useState({
    lunchCutoff: '10:00',
    dinnerCutoff: '16:00',
  });
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (employeeId) {
      axios
        .get(`${BASE_URL}/api/employees/${employeeId}`)
        .then((res) => setEmployeeName(res.data.name))
        .catch((err) => console.error('Error fetching name', err));
    }
  }, [employeeId]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/vendors`)
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Error fetching vendors', err));
  }, []); 

  useEffect(() => {
    let newErrors = {};
    if (!mealType) {
      newErrors.mealType = 'Please select a meal type';
    }
    if (!orderDate) {
      newErrors.orderDate = 'Please select a date';
    }
    if (!vendorId) {
      newErrors.vendorId = 'Please choose a vendor';
    }
    if (selectedItems.length === 0) {
      newErrors.selectedItems = 'Please select at least one item';
    }
    setErrors(newErrors);
  }, [mealType, orderDate, vendorId, selectedItems]);

  useEffect(() => {
    if (vendorId && mealType) {
      axios
        .get(`${BASE_URL}/api/menus?vendor_id=${vendorId}&meal_type=${mealType}`)
        .then((res) => setMenuItems(res.data))
        .catch((err) => console.error('Error fetching menu', err));
    } else {
      setMenuItems([]);
    }
  }, [vendorId, mealType]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/orders/cutoff-times`)
      .then(res => {
        setCutoffTimes({
          lunchCutoff: res.data.lunchCutoff,
          dinnerCutoff: res.data.dinnerCutoff,
        });
      })
      .catch(err => {
        console.error('Failed to fetch cutoff times', err);
      });
  }, []);

  const toggleItem = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (item) => {
    setSelectedItems((prev) =>
      prev
        .map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const calculateTotal = () =>
    selectedItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const handleOrder = () => {
    const now = new Date();

    if (!cutoffTimes?.lunchCutoff || !cutoffTimes?.dinnerCutoff) {
      console.error('Cutoff times are missing or undefined:', cutoffTimes);
      alert('Cutoff times are not available. Please try again later.');
      return;
    }

    const [lunchHour, lunchMinute] = cutoffTimes.lunchCutoff.split(':').map(Number);
    const [dinnerHour, dinnerMinute] = cutoffTimes.dinnerCutoff.split(':').map(Number);

    const lunchCutoff = new Date();
    lunchCutoff.setHours(lunchHour, lunchMinute, 0, 0);

    const dinnerCutoff = new Date();
    dinnerCutoff.setHours(dinnerHour, dinnerMinute, 0, 0);

    const selectedMealType = mealType || 'Lunch';

    const isBeforeCutoff =
      (selectedMealType === 'Lunch' && now < lunchCutoff) ||
      (selectedMealType === 'Dinner' && now < dinnerCutoff);

    if (!isBeforeCutoff) {
      alert(`${selectedMealType} order cutoff time has passed.`);
      return;
    }

    const newOrderNo = Math.floor(100000 + Math.random() * 900000);
    const todayDate = now.toISOString().split('T')[0];

    const summary = {
      orderNo: newOrderNo,
      date: todayDate,
      meal_type: selectedMealType,
      items: selectedItems.map((i) => ({
        menu_item: i.menu_item,
        quantity: i.quantity,
      })),
      total: calculateTotal(),
    };

    setOrderSummary(summary);
    setShowSummary(true);
    setTimeout(() => setShowSummary(false), 10000);

    const token = localStorage.getItem('token');
    axios
      .post(
        `${BASE_URL}/api/orders`,
        {
          employeeId,
          orderNo: newOrderNo,
          date: todayDate,
          meal_type: selectedMealType,
          items: summary.items,
          total: summary.total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Order saved successfully:', response.data);
      })
      .catch((err) => {
        console.error('Error saving order:', err);
        alert('Error placing order: ' + (err.response?.data?.message || 'Unknown error'));
      });

    setSelectedItems([]);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const orderHistory = () => {
    window.location.href = '/orderHistory';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <Header name={name} employeeName={employeeName} orderHistory={orderHistory} logout={logout} />
        <SelectionRow
          mealType={mealType}
          setMealType={setMealType}
          orderDate={orderDate}
          setOrderDate={setOrderDate}
          today={today}
          errors={errors}
        />
        <VendorSelection vendors={vendors} vendorId={vendorId} setVendorId={setVendorId} errors={errors} />
        {menuItems.length > 0 && (
          <MenuItems
            menuItems={menuItems}
            selectedItems={selectedItems}
            toggleItem={toggleItem}
            removeItem={removeItem}
            errors={errors}
          />
        )}
        <div>
          <button
            disabled={Object.keys(errors).length > 0}
            onClick={handleOrder}
            className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
        <OrderSummary
          showSummary={showSummary}
          orderSummary={orderSummary}
          setShowSummary={setShowSummary}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
