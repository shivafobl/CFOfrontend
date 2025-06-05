import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendorName, setNewVendorName] = useState("");
  const [newVendorDescription, setNewVendorDescription] = useState("");
  const [newVendorEmail, setNewVendorEmail] = useState("");
  const [newVendorPhone, setNewVendorPhone] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [vendorItems, setVendorItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemMealType, setNewItemMealType] = useState("Lunch"); // Default value
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  // Fetch vendors on load
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/vendors`);
      setVendors(res.data);
    } catch (err) {
      console.error("Failed to load vendors:", err);
    }
  };

  const addVendor = async () => {
    try {
      await axios.post(`${BASE_URL}/api/admin/vendor`, {
        name: newVendorName,
        description: newVendorDescription,
        email: newVendorEmail,
        phone: newVendorPhone,
      });
      setNewVendorName("");
      setNewVendorDescription("");
      setNewVendorEmail("");
      setNewVendorPhone("");
      fetchVendors();
    } catch (err) {
      console.error("Add vendor failed:", err);
    }
  };

  const deleteVendor = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/vendor/${id}`);
      fetchVendors(); // Refresh the list of vendors
    } catch (err) {
      console.error('Delete vendor failed:', err);
      alert('Failed to delete vendor. Please try again later.');
    }   
  };

  const fetchItems = async (vendorId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/vendors/${vendorId}/menus`);
      setVendorItems(res.data);
      setSelectedVendorId(vendorId);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const addItem = async () => {
    try {
      await axios.post(`${BASE_URL}/api/admin/menu`, {
        vendor_id: selectedVendorId,
        menu_item: newItemName,
        price: newItemPrice,
        meal_type: newItemMealType,
      });
      setNewItemName("");
      setNewItemPrice("");
      setNewItemMealType("Lunch"); // Reset to default value
      fetchItems(selectedVendorId);
    } catch (err) {
      console.error("Add item failed:", err);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/menu/${itemId}`);
      fetchItems(selectedVendorId);
    } catch (err) {
      console.error("Delete item failed:", err);
    }
  };

  return (
    <div
      className="p-6 min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(228,113,4,1), rgba(193,4,34,1))",
      }}
    >
      <div
        className="w-full max-w-5xl rounded-xl shadow-xl p-6"
        style={{
          background: "rgba(248,248,248,0.95)", // semi-transparent light background
        }}
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "rgba(0,0,0,1)" }}
        >
          Vendor Management
        </h2>

        {/* Add Vendor */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={newVendorName}
            onChange={(e) => setNewVendorName(e.target.value)}
            placeholder="New vendor name"
            className="border p-2 rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(228,113,4,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
          <input
            type="text"
            value={newVendorDescription}
            onChange={(e) => setNewVendorDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(228,113,4,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
          <input
            type="email"
            value={newVendorEmail}
            onChange={(e) => setNewVendorEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(228,113,4,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
          <input
            type="text"
            value={newVendorPhone}
            onChange={(e) => setNewVendorPhone(e.target.value)}
            placeholder="Phone"
            className="border p-2 rounded"
            style={{
              color: "rgba(0,0,0,1)",
              borderColor: "rgba(228,113,4,1)",
              background: "rgba(248,248,248,1)",
            }}
          />
          <button
            onClick={addVendor}
            className="px-4 py-2 rounded font-bold"
            style={{
              background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
              color: "rgba(248,248,248,1)",
            }}
          >
            Add Vendor
          </button>
        </div>

        {/* Vendor List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="border p-4 rounded shadow"
              style={{
                background: "rgba(248,248,248,1)",
                borderColor: "rgba(228,113,4,1)",
              }}
            >
              <h3 className="text-lg font-bold" style={{ color: "rgba(228,113,4,1)" }}>{vendor.name}</h3>
              <p style={{ color: "rgba(0,0,0,1)" }}>{vendor.description}</p>
              <p style={{ color: "rgba(0,0,0,1)" }}>{vendor.email}</p>
              <p style={{ color: "rgba(0,0,0,1)" }}>{vendor.phone}</p>
              <button
                onClick={() => fetchItems(vendor.id)}
                className="underline text-sm mr-3 font-semibold"
                style={{ color: "rgba(193,4,34,1)" }}
              >
                Manage Items
              </button>
              <button
                onClick={() => deleteVendor(vendor.id)}
                className="underline text-sm font-semibold"
                style={{ color: "rgba(228,113,4,1)" }}
              >
                Delete Vendor
              </button>
            </div>
          ))}
        </div>

        {/* Item Management */}
        {selectedVendorId && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2" style={{ color: "rgba(193,4,34,1)" }}>
              Items for Vendor {vendors.find(vendor => vendor.id === selectedVendorId)?.name || 'Unknown'}
            </h3>
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Item name"
                className="border p-2 rounded"
                style={{
                  color: "rgba(0,0,0,1)",
                  borderColor: "rgba(228,113,4,1)",
                  background: "rgba(248,248,248,1)",
                }}
              />
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="Price"
                className="border p-2 rounded"
                style={{
                  color: "rgba(0,0,0,1)",
                  borderColor: "rgba(228,113,4,1)",
                  background: "rgba(248,248,248,1)",
                }}
              />
              <select
                value={newItemMealType}
                onChange={(e) => setNewItemMealType(e.target.value)}
                className="border p-2 rounded"
                style={{
                  color: "rgba(0,0,0,1)",
                  borderColor: "rgba(228,113,4,1)",
                  background: "rgba(248,248,248,1)",
                }}
              >
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <button
                onClick={addItem}
                className="px-4 py-2 rounded font-bold"
                style={{
                  background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
                  color: "rgba(248,248,248,1)",
                }}
              >
                Add Item
              </button>
            </div>

            <ul className="space-y-6">
              {vendorItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center space-x-4">
                  <span style={{ color: "rgba(0,0,0,1)" }}>
                    {item.item_name} - ₹{item.price} - {item.meal_type}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-sm underline font-semibold"
                    style={{ color: "rgba(193,4,34,1)" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorManagement;

