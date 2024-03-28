import React from "react";
import bg from "../assets/bg.png";

const Layout = () => {
  return (
    <div>
      <div className="mt-6  ">
        <img src={bg} alt="bg" className="rounded-xl" />
      </div>
      <div className="text-center mt-6 text-3xl font-bold">Blogs</div>
      <div className="flex items-start justify-between mt-8 border border-gray-300 rounded-lg p-4 mb-12">
        <div className="h-[100%] w-[80%]">
          <img
            src="https://miro.medium.com/v2/resize:fit:408/format:webp/1*eGA1BzYF6ETCn6wO09Gm-A.png"
            alt="image"
          />
        </div>
        <div>
          <div className="text-2xl font-bold">
            Mastering React: A Comprehensive Guide to State Management, Props,
            Virtual DOM, and Hooks
          </div>
          <p className="flex gap-4 text-xs font-bold text-[grey]">
            <div className="">Taru Pathak </div>
            <div>2024-03-27 16:45</div>
          </p>
          <p>
            In the dynamic world of web development, React stands as a beacon of
            innovation, providing developers with a powerful toolkit for
            building user interfaces. With its component-based architecture,
            efficient rendering powered by the Virtual DOM, and intuitive state
            management, React has become the cornerstone of modern web
            applications. In this extensive guide, we’ll embark on a journey
            through React’s core concepts, exploring states, props, the Virtual
            DOM, and delving into the world of Hooks, including useState,
            useEffect, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
