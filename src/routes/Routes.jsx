import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, NotFound, RQSuperHeroes, SuperHeroes } from "../pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/super-heroes" element={<SuperHeroes />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
