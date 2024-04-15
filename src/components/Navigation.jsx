import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 shadow bg-yellow-100">
      <h1 className="font-bold text-xl">REACT QUERY DEMO</h1>
      <div className="flex gap-4 capitalize font-semibold text-lg">
        <Link
          to="/"
          className="hover:text-gray-600  transition-all ease-linear"
        >
          Home
        </Link>
        <Link
          to="/super-heroes"
          className="hover:text-gray-600 transition-all ease-linear"
        >
          Traditional Super Heroes
        </Link>
        <Link
          to="/rq-super-heroes"
          className="hover:text-gray-600 transition-all ease-linear"
        >
          RQ Super Heroes
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
