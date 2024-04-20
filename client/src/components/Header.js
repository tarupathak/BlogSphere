import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout(){
    fetch('http://localhost:8080/logout',{
      credentials: 'include',
      method: 'POST'
    })
    setUsername(null);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-bold text-black pacifico-regular">
        <Link to="/">BlogSphere</Link>
      </div>
      <div className="flex items-center justify-around gap-12 text-lg">
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
