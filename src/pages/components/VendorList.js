import React from 'react';
import { Pizza, Salad, Utensils } from 'lucide-react';

const VendorList = ({ vendors, vendorId, setVendorId, errors }) => (
  <div>
    <h3 className="text-md font-semibold mb-2">Choose Vendor</h3>
    <div className="flex flex-wrap gap-4">
      {vendors.map((vendor) => (
        <button
          key={vendor.id}
          onClick={() => setVendorId(vendor.id)}
          className={`p-3 rounded-lg border flex items-center space-x-2 whitespace-nowrap ${
            vendorId === vendor.id ? 'bg-orange-200' : 'bg-white'
          }`}
        >
          {vendor.name.includes('Pizza') ? <Pizza /> : vendor.name.includes('Meals') ? <Utensils /> : <Salad />}
          <span>{vendor.name}</span>
        </button>
      ))}
    </div>
    {errors.vendorId && <p className="text-red-500 text-sm">{errors.vendorId}</p>}
  </div>
);

export default VendorList;
