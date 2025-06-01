import React from 'react';

const MealAndDateSelector = ({ mealType, setMealType, orderDate, setOrderDate, today, errors }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block mb-1 text-gray-700">Select Meal Type</label>
      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        className="w-full border rounded px-2 py-1"
      >
        <option value="">-- Select --</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      {errors.mealType && <p className="text-red-500 text-sm">{errors.mealType}</p>}
    </div>
    <div>
      <label className="block mb-1 text-gray-700">Pick Date</label>
      <input
        type="date"
        value={orderDate}
        min={today}
        max={today}
        onChange={(e) => setOrderDate(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
      {errors.orderDate && <p className="text-red-500 text-sm">{errors.orderDate}</p>}
    </div>
  </div>
);

export default MealAndDateSelector;
