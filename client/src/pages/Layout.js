import React, { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import Post from "../components/Post";

const Layout = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div>
      <div className="mt-6  ">
        <img src={bg} alt="bg" className="rounded-xl" />
      </div>
      <div className="text-center mt-6 text-3xl font-bold">Blogs</div>
      <div>
       {posts.length>0 && posts.map(post=>(
        <Post {...post}/>
       ))}
      </div>
    </div>
  );
};

export default Layout;
