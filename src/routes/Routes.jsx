import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DependentQueriesPage,
  DynamicParallelQueries,
  Home,
  NotFound,
  ParallelQueries,
  RQSingleHero,
  RQSuperHeroes,
  SuperHeroes,
} from "../pages";
import PaginatedQueries from "../pages/PaginatedQueries";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/super-heroes" element={<SuperHeroes />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
        <Route path="/rq-super-heroes/:id" element={<RQSingleHero />} />
        <Route path="/rq-parallel" element={<ParallelQueries />} />
        <Route
          path="/rq-parallel-dynamic"
          element={<DynamicParallelQueries heroIds={[1, 3]} />}
        />
        <Route
          path="/rq-dependent-queries"
          element={<DependentQueriesPage email="johndoe@example.com" />}
        />
        <Route path="/rq-colors" element={<PaginatedQueries />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
