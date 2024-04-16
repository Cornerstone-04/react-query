import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { CloseIcon, MenuBar } from "../assets/Icons";

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <nav className="w-full h-fit md:h-[80px] sticky top-0 flex justify-between items-center p-4 shadow bg-slate-800 text-[#FFFFF0]">
      <h1 className="font-bold text-base sm:text-lg lg:text-xl">
        REACT QUERY DEMO
      </h1>
      <div className="hidden md:flex gap-2 lg:gap-4 capitalize font-semibold text-sm lg:text-lg">
        <Link
          to="/"
          className="hover:text-slate-500 transition-all ease-linear"
        >
          Home
        </Link>
        <span>|</span>
        <Link
          to="/super-heroes"
          className="hover:text-slate-500 transition-all ease-linear"
        >
          Traditional Super Heroes
        </Link>
        <span>|</span>
        <Link
          to="/rq-super-heroes"
          className="hover:text-slate-500 transition-all ease-linear"
        >
          RQ Super Heroes
        </Link>
      </div>
      <div className="flex md:hidden">
        <button onClick={handleToggleMenu}>
          {toggleMenu ? <CloseIcon /> : <MenuBar />}
        </button>
      </div>

      {toggleMenu && <Menu />}
    </nav>
  );
};

export default Navigation;
