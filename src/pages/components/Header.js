import React from 'react';

const Header = ({ name, onLogout, onOrderHistory }) => (
  <div className="flex justify-between items-center">
    <h1 className="text-xl font-bold text-black">Welcome, {name}</h1>
    <div className="flex space-x-4">
      <button onClick={onOrderHistory} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
        Order History
      </button>
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  </div>
);

export default Header;
