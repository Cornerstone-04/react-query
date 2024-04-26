import React, { useState, useEffect } from "react";
import axiosApi from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { HeroCard, Layout, ResponseLayout } from "../components";

const fetchColors = async (pageNo) => {
  try {
    const response = await axiosApi.get(`/colors?_page=${pageNo}&_per_page=4`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["colors", page],
    queryFn: () => fetchColors(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = parseInt(searchParams.get("page")) || 1;
    setPage(pageParam);
  }, []); // Run once on component mount

  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", newPage);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
    setPage(newPage);
  };

  if (isLoading) {
    return <ResponseLayout text="Loading..." />;
  }

  if (isError) {
    console.error(error);
    return <ResponseLayout text={error.message || "Error fetching data"} />;
  }

  if (data?.data.length === 0 || !data) {
    return <ResponseLayout text="No colors available." />;
  }

  return (
    <Layout>
      <main className="w-full flex flex-col gap-4 p-4 ">
        <header className="w-full font-bold flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Colors</h2>
        </header>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4 mb-6">
          {data?.data.map(({ id, label, hex }) => (
            <HeroCard
              key={id}
              name={label}
              alterEgo={
                <div className="w-full h-20" style={{ backgroundColor: hex }} />
              }
            />
          ))}
        </div>
        <div className="w-full h-fit bg-white shadow-lg py-2 flex items-center justify-center gap-4 mt-4 absolute bottom-0 right-1/2 translate-x-1/2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous Page"
            className="btn-prev disabled:opacity-50 w-fit py-2 px-4 bg-slate-300 flex justify-center items-center shadow-lg rounded-md hover:bg-slate-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-opacity-50"
          >
            <i className="fa-solid fa-arrow-left fa-lg"></i>
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === data?.pages}
            aria-label="Next Page"
            className="btn-next disabled:opacity-50 w-fit py-2 px-4 bg-slate-300 flex justify-center items-center shadow-lg rounded-md hover:bg-slate-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-opacity-50"
          >
            <i className="fa-solid fa-arrow-right fa-lg"></i>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default PaginatedQueries;
