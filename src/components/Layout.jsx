import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex flex-col">
      <Navigation />
      <div className="w-full pt-4">{children}</div>
    </div>
  );
};

export default Layout;
