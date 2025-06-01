// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // function OrderHistory({ employeeId }) {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         if (!employeeId) {
// //           throw new Error('Employee ID is required');
// //         }
// //         const res = await axios.get(`http://localhost:5000/api/orders/${employeeId}`);
// //         setOrders(res.data);
// //       } catch (err) {
// //         console.error('Error fetching order history:', err);
// //         setError('Failed to fetch order history. Please try again later.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (employeeId) {
// //       fetchHistory();
// //     }
// //   }, [employeeId]);

// //   if (loading) {
// //     return <div className="p-6 text-center">Loading order history...</div>;
// //   }

// //   if (error) {
// //     return <div className="p-6 text-center text-red-500">{error}</div>;
// //   }

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     const date = new Date(dateString);
// //     return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleDateString();
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Your Order History</h2>

// //       {orders.length === 0 ? (
// //         <p className="text-gray-500 text-center">No orders found.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {orders.map((order, index) => (
// //             <div key={index} className="bg-white rounded-xl shadow p-4 border border-gray-200">
// //               <div className="flex justify-between items-center mb-2">
// //                 <div className="font-semibold text-lg">Order No: #{order.order_no}</div>
// //                 <div className="text-sm text-gray-600">
// //                   Order Placed Date: {formatDate(order.order_time)}
// //                 </div>
// //               </div>
// //               <div className="mb-2">
// //                 <span className="font-medium">Total Amount:</span> ₹{order.total_amount}
// //               </div>
// //               <div className="mb-2">
// //                 <span className="font-medium">Order Pickup Date:</span> {formatDate(order.order_date)}
// //               </div>
// //               <ul className="list-disc ml-5 text-sm text-gray-700">
// //                 {order.items.map((item, idx) => (
// //                   <li key={idx} className="mb-1">
// //                     {item.item} × {item.quantity}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default OrderHistory;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function OrderHistory({ employeeId }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!employeeId) {
//           throw new Error('Employee ID is required');
//         }
//         const res = await axios.get(`http://localhost:5000/api/orders/${employeeId}`);
//         setOrders(res.data);
//       } catch (err) {
//         console.error('Error fetching order history:', err);
//         setError('Failed to fetch order history. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (employeeId) {
//       fetchHistory();
//     }
//   }, [employeeId]);

//   if (loading) {
//     return <div className="p-6 text-center bg-gray-100">Loading order history...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-500 bg-gray-100">{error}</div>;
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleDateString();
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-red-500 text-2xl font-bold mb-4">Your Order History</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, index) => (
//             <div key={index} className="bg-orange-500 text-white rounded-xl shadow p-4 border border-gray-200">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="font-semibold text-lg">Order No: #{order.order_no}</div>
//                 <div className="text-sm text-black">
//                   Order Status: <span className='bg-white text-red-600 border border-black rounded px-2 py-0.5 ml-1 inline-block min-w-[80px] text-center'>{(order.status)} </span>
//                 </div>
//               </div>
//               <div className="mb-2">
//                 <span className="font-medium">Total Amount:</span>Pay at Canteen
//                </div>  {/*₹{order.total_amount}} */}
//               <div className="mb-2">
//                 <span className="font-medium">Order Pickup Date:</span> {formatDate(order.order_date)}
//               </div>
//               <ul className="list-disc ml-5 text-sm text-gray-700">
//                 {order.items.map((item, idx) => (
//                   <li key={idx} className="mb-1">
//                     {item.item} × {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//               <button className="mt-4 bg-white text-red-600 ">Collect your order at canteen</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderHistory;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function OrderHistory({ employeeId }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!employeeId) {
//           throw new Error('Employee ID is required');
//         }
//         const res = await axios.get(`http://localhost:5000/api/orders/${employeeId}`);
//         setOrders(res.data);
//       } catch (err) {
//         console.error('Error fetching order history:', err);
//         setError('Failed to fetch order history. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (employeeId) {
//       fetchHistory();
//     }
//   }, [employeeId]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleDateString();
//   };

//   const handleCollect = (orderNo, index) => {
//     setTimeout(async () => {
//       try {
//         await axios.post(`http://localhost:5000/api/orders/${orderNo}/collect`);
//         setOrders((prevOrders) => {
//           const updated = [...prevOrders];
//           updated[index] = { ...updated[index], status: "Collected" };
//           return updated;
//         });
//       } catch (err) {
//         console.error('Failed to update status in DB:', err);
//       }
//     }, 60000);
//   };

//   if (loading) {
//     return <div className="p-6 text-center bg-gray-100">Loading order history...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-500 bg-gray-100">{error}</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 relative">
//       <h2 className="text-red-500 text-2xl font-bold mb-4">Your Order History</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, index) => (
//             <div key={index} className="bg-orange-500 text-white rounded-xl shadow p-4 border border-gray-200">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="font-semibold text-lg">Order No: #{order.order_no}</div>
//                 <div className="text-sm text-black">
//                   Order Status:{" "}
//                   <span className="bg-white text-red-600 border border-black rounded px-2 py-0.5 ml-1 inline-block min-w-[80px] text-center">
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="mb-2">
//                 <span className="font-medium">Total Amount:</span> Pay at Canteen
//               </div>
//               <div className="mb-2">
//                 <span className="font-medium">Order Pickup Date:</span> {formatDate(order.order_date)}
//               </div>
//               <ul className="list-disc ml-5 text-sm text-gray-700">
//                 {order.items.map((item, idx) => (
//                   <li key={idx} className="mb-1">
//                     {item.item} × {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//               {order.status !== "Collected" && (
//                 <button
//                   className="mt-4 bg-white text-red-600 px-4 py-2 rounded"
//                   onClick={() => {
//                     setSelectedOrder({ order_no: order.order_no, index });
//                     setShowPopup(true);
//                   }}
//                 >
//                   Collect your order at canteen
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {showPopup && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4 w-[300px]">
//             <h3 className="text-lg font-semibold">Confirm Collection</h3>
//             <p className="text-gray-700">Start 1-minute timer to mark order as collected?</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => {
//                   handleCollect(selectedOrder.order_no, selectedOrder.index);
//                   setShowPopup(false);
//                 }}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderHistory;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScanPay from './QRScanAndPay';

function OrderHistory({ employeeId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!employeeId) throw new Error('Employee ID is required');
        const res = await axios.get(`http://localhost:5000/api/orders/${employeeId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError('Failed to fetch order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) fetchHistory();
  }, [employeeId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toString() === 'Invalid Date' ? 'N/A' : date.toLocaleDateString();
  };

  const handleConfirmCollect = (order, index) => {
    setSelectedOrder({ ...order, index });
    setShowPopup(true);
    setShowOrderDetails(false);
  };

  const startCollectionProcess = async () => {
    setShowPopup(true);
    setShowOrderDetails(true);

    setTimeout(async () => {
      try {
        await axios.post(`http://localhost:5000/api/orders/${selectedOrder.order_no}/collect`);
        setOrders((prevOrders) => {
          const updated = [...prevOrders];
          updated[selectedOrder.index] = { ...updated[selectedOrder.index], status: "Collected" };
          return updated;
        });
      } catch (err) {
        console.error('Failed to update status in DB:', err);
      } finally {
        setShowPopup(false);
        setShowOrderDetails(false);
        setSelectedOrder(null);
      }
    }, 60000); // 1 minute
  };

  if (loading) {
    return <div className="p-6 text-center bg-gray-100">Loading order history...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500 bg-gray-100">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 relative">
      <h2 className="text-red-500 text-2xl font-bold mb-4">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-orange-500 text-white rounded-xl shadow p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-black text-lg">Order No: <b className='text-white lg:first-letter:'>#{order.order_no}</b></div>
                <div className="font-medium text-black">
                  Order Status:{" "}
                  <span className="bg-white text-red-600 border border-black rounded px-2 py-0.5 ml-1 inline-block min-w-[80px] text-center">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium text-black">Meal Type:</span> <b className='text-white lg:first-letter:'>{order.meal_type}</b>
              </div>
              <div className="mb-2">
                <span className="font-medium text-black">Order Pickup Date:</span> <b>{formatDate(order.order_date)}</b>
              </div>
              <ul className="list-disc ml-5 text-lg text-black">
                {order.items.map((item, idx) => (
                  <li key={idx} className="mb-1 text-white">
                    {item.item} × {item.quantity}
                  </li>
                ))}
              </ul>
              {!(order.status === "Collected" || order.status === "Expired") && (
                <button
                  className="mt-4 bg-white text-red-700 px-4 py-2 rounded"
                  onClick={() => handleConfirmCollect(order, index)}
                >
                 <b>Collect your order at canteen</b>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showPopup && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6 w-[500px] max-w-[90%]">

            {!showOrderDetails ? (
              <>
                <h3 className="text-lg font-semibold">Are you at the canteen to collect?</h3>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={startCollectionProcess}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setSelectedOrder(null);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">Please show this to vendor</h3>
                <div className="text-left text-lg bg-gray-100 rounded p-3 border">
                  <p className="font-medium mb-2 ">Order No: #{selectedOrder.order_no}</p>
                  <p className="font-medium mb-2">Meal Type: #{selectedOrder.meal_type}</p>
                  <ul className="list-disc ml-5 text-red-500">
                   <b> {selectedOrder.items.map((item, idx) => (
                      <li key={idx}>{item.item} × {item.quantity}</li>
                    ))} </b>
                  </ul>
                  <p><ScanPay /></p>
                </div>
                <p className="text-xs text-gray-500">This will disappear in 1 minute.Don't go back</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;



