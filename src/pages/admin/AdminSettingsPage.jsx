// import React, { useState, useEffect } from "react";

// const AdminSettingsPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [orderingOpenTime, setOrderingOpenTime] = useState("08:00");
//   const [canteenClosedDates, setCanteenClosedDates] = useState(["2025-06-15"]);
//   const [newClosedDate, setNewClosedDate] = useState("");

//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const [admins, setAdmins] = useState([]);
//   const [newAdminEmail, setNewAdminEmail] = useState("");
//   const [newAdminPassword, setNewAdminPassword] = useState("");

//   // Simulate fetching existing settings/admins
//   useEffect(() => {
//     // TODO: Replace with API call
//     setAdmins([
//       { id: 1, email: "admin1@example.com" },
//       { id: 2, email: "admin2@example.com" },
//     ]);
//   }, []);

//   const handleUpdateProfile = () => {
//     // TODO: Send updated email/password to backend
//     console.log("Update profile:", { email, password });
//   };

//   const handleAddAdmin = () => {
//     if (!newAdminEmail || !newAdminPassword) return;
//     const newAdmin = {
//       id: Date.now(),
//       email: newAdminEmail,
//     };
//     setAdmins([...admins, newAdmin]);
//     setNewAdminEmail("");
//     setNewAdminPassword("");
//     // TODO: Send to backend
//   };

//   const handleDeleteAdmin = (id) => {
//     setAdmins(admins.filter((admin) => admin.id !== id));
//     // TODO: Delete admin from backend
//   };

//   const handleSaveOrderingTime = () => {
//     console.log("Ordering open time set to:", orderingOpenTime);
//     // TODO: Save to backend
//   };

//   const handleAddClosedDate = () => {
//     if (newClosedDate && !canteenClosedDates.includes(newClosedDate)) {
//       setCanteenClosedDates([...canteenClosedDates, newClosedDate]);
//       setNewClosedDate("");
//       // TODO: Save to backend
//     }
//   };

//   const handleRemoveClosedDate = (date) => {
//     setCanteenClosedDates(canteenClosedDates.filter((d) => d !== date));
//     // TODO: Update backend
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>

//       {/* Profile Update */}
//       <div className="bg-white p-4 rounded shadow space-y-3">
//         <h3 className="font-medium text-lg">Update Profile</h3>
//         <input
//           type="email"
//           placeholder="New Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//         <button
//           onClick={handleUpdateProfile}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Update Profile
//         </button>
//       </div>

//       {/* Admin Management */}
//       <div className="bg-white p-4 rounded shadow space-y-3">
//         <h3 className="font-medium text-lg">Admin Account Management</h3>
//         <div className="flex flex-col sm:flex-row gap-2">
//           <input
//             type="email"
//             placeholder="New Admin Email"
//             value={newAdminEmail}
//             onChange={(e) => setNewAdminEmail(e.target.value)}
//             className="border p-2 rounded flex-1"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newAdminPassword}
//             onChange={(e) => setNewAdminPassword(e.target.value)}
//             className="border p-2 rounded flex-1"
//           />
//           <button
//             onClick={handleAddAdmin}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add Admin
//           </button>
//         </div>

//         <ul className="space-y-2">
//           {admins.map((admin) => (
//             <li
//               key={admin.id}
//               className="flex justify-between items-center border p-2 rounded"
//             >
//               <span>{admin.email}</span>
//               <button
//                 onClick={() => handleDeleteAdmin(admin.id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Ordering Time */}
//       <div className="bg-white p-4 rounded shadow space-y-3">
//         <h3 className="font-medium text-lg">Set Ordering Open Time</h3>
//         <input
//           type="time"
//           value={orderingOpenTime}
//           onChange={(e) => setOrderingOpenTime(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={handleSaveOrderingTime}
//           className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
//         >
//           Save Time
//         </button>
//       </div>

//       {/* Closed Dates */}
//       <div className="bg-white p-4 rounded shadow space-y-3">
//         <h3 className="font-medium text-lg">Canteen Closed Dates</h3>
//         <div className="flex gap-2">
//           <input
//             type="date"
//             value={newClosedDate}
//             onChange={(e) => setNewClosedDate(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button
//             onClick={handleAddClosedDate}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Add Date
//           </button>
//         </div>
//         <ul className="space-y-2">
//           {canteenClosedDates.map((date) => (
//             <li
//               key={date}
//               className="flex justify-between items-center border p-2 rounded"
//             >
//               <span>{date}</span>
//               <button
//                 onClick={() => handleRemoveClosedDate(date)}
//                 className="text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Theme Toggle */}
//       <div className="bg-white p-4 rounded shadow flex justify-between items-center">
//         <span className="font-medium text-lg">Dark Theme</span>
//         <label className="inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             checked={isDarkTheme}
//             onChange={() => setIsDarkTheme(!isDarkTheme)}
//             className="sr-only peer"
//           />
//           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-orange-600 transition-all" />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default AdminSettingsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const SettingsPage = () => {
  const [lunchCutoff, setLunchCutoff] = useState("10:00");
  const [dinnerCutoff, setDinnerCutoff] = useState("16:00");
  const [closedDates, setClosedDates] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/settings");
        const settings = res.data;
        setLunchCutoff(settings.lunch_cutoff || "10:00");
        setDinnerCutoff(settings.dinner_cutoff || "16:00");
        setClosedDates(settings.canteen_closed_dates || "");
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await axios.put("http://localhost:5000/api/admin/settings", {
        lunch_cutoff: lunchCutoff,
        dinner_cutoff: dinnerCutoff,
        canteen_closed_dates: closedDates,
      });
      setStatus("Settings updated successfully");
    } catch (err) {
      console.error("Error updating settings", err);
      setStatus("Failed to update settings");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Lunch Cutoff Time</label>
        <input
          type="time"
          value={lunchCutoff}
          onChange={(e) => setLunchCutoff(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Dinner Cutoff Time</label>
        <input
          type="time"
          value={dinnerCutoff}
          onChange={(e) => setDinnerCutoff(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Canteen Closed Dates</label>
        <input
          type="text"
          placeholder="YYYY-MM-DD,YYYY-MM-DD"
          value={closedDates}
          onChange={(e) => setClosedDates(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>

      {status && <p className="mt-4 text-green-700">{status}</p>}
    </div>
  );
};

export default SettingsPage;
