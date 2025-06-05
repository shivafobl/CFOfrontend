import React, {  useState } from "react";
import axios from "axios";
;


const MostBoughtItems = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const fetchMostBoughtItems = async () => {
    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/api/admin/most-bought-items?date=${selectedDate}`);
      setItems(res.data.rows);
      setError("");
    } catch (err) {
      console.error("Failed to fetch items", err);
      setError("Error fetching most bought items");
    }
  };

  return (
    <div
      className="min-h-screen flex items-top justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(228,113,4,1), rgba(193,4,34,1))",
      }}
    >
      <div
        className="p-8 rounded-xl shadow-xl w-full max-w-3xl"
        style={{
          background: "rgba(248,248,248,1)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "rgba(0,0,0,1)" }}
        >
          Most Bought Items
        </h2>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="date"
            className="p-2 border rounded"
            style={{ color: "rgba(0,0,0,1)", borderColor: "rgba(228,113,4,1)" }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={fetchMostBoughtItems}
            className="px-4 py-2 rounded font-bold"
            style={{
              background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
              color: "rgba(248,248,248,1)",
            }}
          >
            Fetch Items
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {items.length > 0 ? (
          <table className="w-full border mt-4 text-left">
            <thead>
              <tr style={{ background: "rgba(228,113,4,0.2)" }}>
                <th className="p-2" style={{ color: "rgba(0,0,0,1)" }}>Item Name</th>
                <th className="p-2" style={{ color: "rgba(0,0,0,1)" }}>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.item_id} className="border-t">
                  <td className="p-2" style={{ color: "rgba(0,0,0,1)" }}>{item.item}</td>
                  <td className="p-2" style={{ color: "rgba(0,0,0,1)" }}>{item.total_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4" style={{ color: "rgba(0,0,0,1)" }}>No data to show</p>
        )}
      </div>
    </div>
  );
};

export default MostBoughtItems;