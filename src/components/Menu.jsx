import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ showMenu }) => {
  // Apply styles conditionally based on showMenu prop
  const menuStyles = showMenu
    ? "opacity-100 visible"
    : "opacity-0 invisible";

  return (
    <div className={`w-fit h-fit p-4 z-[100] ring-2 bg-slate-800 text-white shadow flex flex-col items-end lg:hidden gap-6 fixed top-[56px] right-0 transition-opacity duration-300 ease-linear ${menuStyles}`}>
      <div className="flex flex-col gap-4 items-end capitalize font-semibold text-sm lg:text-lg">
        <Link
          to="/"
          className="hover:text-slate-400 transition-all ease-linear"
        >
          Home
        </Link>
        <Link
          to="/super-heroes"
          className="hover:text-slate-400 transition-all ease-linear"
        >
          Traditional Super Heroes
        </Link>
        <Link
          to="/rq-super-heroes"
          className="hover:text-slate-400 transition-all ease-linear"
        >
          RQ Super Heroes
        </Link>
        <Link
          to="/rq-parallel"
          className="hover:text-slate-400 transition-all ease-linear"
        >
          Parallel Requests
        </Link>
      </div>
    </div>
  );
};

export default Menu;
