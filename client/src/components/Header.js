import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:8080/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <div className="flex items-center justify-between">
      <div className="text-bold text-black pacifico-regular">
        <Link to="/">BlogSphere</Link>
      </div>
      <div class="flex items-center justify-around gap-12 text-lg">
        {username && (
          <>
            <Link
              to="/create"
              class="transition duration-300 ease-in-out transform hover:scale-110"
            >
              Create new post
            </Link>
            <Link
              onClick={logout}
              class="transition duration-300 ease-in-out transform hover:scale-110"
            >
              Logout
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link
              to="/login"
              class="transition duration-300 ease-in-out transform hover:scale-110"
            >
              Login
            </Link>
            <Link
              to="/register"
              class="transition duration-300 ease-in-out transform hover:scale-110"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
