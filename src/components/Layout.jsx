import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex flex-col">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
