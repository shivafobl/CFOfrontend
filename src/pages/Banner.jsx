import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Banner = () => {
  const [banner, setBanner] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/banner`);
        setBanner(res.data.message);
      } catch {
        setBanner("");
      }
    };
    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <div
      className="w-full py-3 mb-6 rounded text-center font-bold"
      style={{
        background: "linear-gradient(90deg, rgba(228,113,4,1), rgba(193,4,34,1))",
        color: "rgba(248,248,248,1)",
        fontSize: "1.2rem",
        letterSpacing: "1px"
      }}
    >
      {banner}
    </div>
  );
};

export default Banner;