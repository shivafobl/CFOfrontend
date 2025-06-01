import React from 'react';

const OrderButton = ({ handleOrder, hasErrors }) => (
  <div>
    <button
      disabled={hasErrors}
      onClick={handleOrder}
      className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
    >
      Place Order
    </button>
  </div>
);

export default OrderButton;