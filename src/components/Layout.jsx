import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children, className }) => {
  return (
    <div className={`${className} w-full flex flex-col`}>
      <Navigation />
      <div className="w-full p-4 h-fit-screen overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
