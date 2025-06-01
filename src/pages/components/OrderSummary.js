import React from 'react';

const OrderSummary = ({ showSummary, orderSummary, setShowSummary }) => {
  return (
    <div>
      {showSummary && orderSummary && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowSummary(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center text-green-600 mb-4">Order Placed Successfully!</h2>
            <p><strong>Order No:</strong> {orderSummary.orderNo}</p>
            <p><strong>Date:</strong> {orderSummary.date}</p>
            <p><strong>Meal Type:</strong> {orderSummary.meal_type}</p>
             <p><strong>Total:</strong> Pay at Canteen</p> {/*/₹{orderSummary.total.toFixed(2)} */}
            <ul className="mt-2 space-y-1">
              {orderSummary.items.map((item, index) => (
                <li key={index}>
                  {item.menu_item} x {item.quantity}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowSummary(false)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderSummary;