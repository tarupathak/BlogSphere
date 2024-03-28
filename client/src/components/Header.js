import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-bold text-black pacifico-regular">
        <Link to="/">BlogSphere</Link>
      </div>
      <div className="flex items-center justify-around gap-12 text-lg">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Header;
