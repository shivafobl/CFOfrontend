import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <Banner />
        <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-xl text-center">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-8 md:mb-10 flex flex-wrap justify-center"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          >
            <span className="text-red-500 drop-shadow-md">C</span>
            <span className="text-white drop-shadow-md">a</span>
            <span className="text-orange-500 drop-shadow-md">n</span>
            <span className="text-red-500 drop-shadow-md">t</span>
            <span className="text-white drop-shadow-md">e</span>
            <span className="text-orange-500 drop-shadow-md">e</span>
            <span className="text-red-500 drop-shadow-md">n</span>
            <span className="text-white drop-shadow-md">&nbsp;</span>
            <span className="text-orange-500 drop-shadow-md">C</span>
            <span className="text-red-500 drop-shadow-md">o</span>
            <span className="text-white drop-shadow-md">n</span>
            <span className="text-orange-500 drop-shadow-md">n</span>
            <span className="text-red-500 drop-shadow-md">e</span>
            <span className="text-white drop-shadow-md">c</span>
            <span className="text-orange-500 drop-shadow-md">t</span>
          </h1>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-black-600 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-black-600 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
              Register
            </button>
          </div>
          <Link to="/admin/login">
            <button className="text-sm text-gray-600 underline">Admin Login</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
