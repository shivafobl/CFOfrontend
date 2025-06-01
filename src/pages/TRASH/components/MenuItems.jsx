import React from 'react';

const MenuItems = ({ menuItems, selectedItems, toggleItem, removeItem, errors }) => {
  return (
    <div>
      <h3 className="text-md font-semibold text-black mb-2">Menu Items</h3>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.some((i) => i.id === item.id)}
                onChange={() => toggleItem(item)}
              />
              {item.menu_item}
            </label>
            <span className="text-black font-medium">₹{item.price}</span>
            {selectedItems.some((i) => i.id === item.id) && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeItem(item)}
                  className="px-2 py-0.5 rounded bg-red-300 hover:bg-red-400"
                >
                  -
                </button>
                <span>
                  {selectedItems.find((i) => i.id === item.id)?.quantity}
                </span>
                <button
                  onClick={() => toggleItem(item)}
                  className="px-2 py-0.5 rounded bg-green-300 hover:bg-green-400"
                >
                  +
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {errors.selectedItems && <p className="text-red-500 text-sm mt-1">{errors.selectedItems}</p>}
    </div>
  );
};

export default MenuItems;