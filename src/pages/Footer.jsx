import React from "react";

const Footer = () => (
  <footer
    className="w-full py-4 mt-8 text-center"
    style={{
      background: "linear-gradient(90deg, #888888, #cccccc)", // gray gradient
      color: "rgba(248,248,248,1)",
      fontWeight: "bold",
      letterSpacing: "1px",
    }}
  >
    © {new Date().getFullYear()} Canteen Connect. All rights reserved.
    <br />
    For any concerns and suggestions, contact:{" "}
    <a
      href="shivasaifobl@gmail.com"
      className="underline"
      style={{ color: "#fff" }}
    >
      shivasaifobl@gmail.com
    </a>
  </footer>
);

export default Footer;