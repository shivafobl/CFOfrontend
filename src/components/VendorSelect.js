import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorSelect = ({ setSelectedVendor }) => {
  const [vendors, setVendors] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch vendors from the backend
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/vendors`);
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div>
      <h2>Select Vendor</h2>
      <select onChange={(e) => setSelectedVendor(e.target.value)}>
        {vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VendorSelect;
