import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="w-fit h-fit p-4 z-[100] bg-yellow-100 shadow flex flex-col items-end lg:hidden gap-6 fixed top-[56px] right-0">
      
      <div className="flex flex-col gap-4 items-end capitalize font-semibold text-sm lg:text-lg">
        <Link
          to="/"
          className="hover:text-slate-500 transition-all ease-linear"
        >
          Home
        </Link>
        <Link
          to="/super-heroes"
          className="hover:text-slate-500 transition-all ease-linear"
        >
          Traditional Super Heroes
        </Link>
        <Link
          to="/rq-super-heroes"
          className="hover:text-slate-500 transition-all ease-linear"
        >
          RQ Super Heroes
        </Link>
      </div>
    </div>
    // </div>
  );
};

export default Menu;
