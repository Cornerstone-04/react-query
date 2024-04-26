import React from "react";
import axiosApi from "../api/axios";
import Layout from "../components/Layout";
import { useQueries } from "@tanstack/react-query";

const fetchSuperHeroes = (heroId) => {
  // Wrap the axios call in a try-catch block to handle HTTP errors
  return axiosApi.get(`/superheroes/${heroId}`).catch(error => {
    if (error.response && error.response.status === 404) {
      // Handling 404 specifically
      throw new Error("Superhero not found");
    } else {
      // General error handling
      throw new Error("An error occurred while fetching superhero data");
    }
  });
};

const DynamicParallelQueries = ({ heroIds }) => {
  const queryResults = useQueries({
    queries: heroIds.map((id) => ({
      queryKey: ["superhero", id],
      queryFn: () => fetchSuperHeroes(id),
      onError: (err) => console.error(`Error fetching hero with ID ${id}:`, err),
    })),
  });

  const isLoading = queryResults.some(query => query.isLoading);
  const hasData = queryResults.some(query => query.data);

  if (heroIds.length === 0) {
    return (
      <Layout>
        <main className="w-full flex flex-col gap-8 p-4">
          <p>No superhero IDs provided.</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="w-full flex flex-col gap-8 p-4">
        {isLoading && !hasData ? (
          <p>Loading superheroes...</p>
        ) : queryResults.map((result, index) => (
          result.isError ? (
            <p key={index}>Error: {result.error.message}</p>
          ) : (
            <div key={heroIds[index]}>
              <h3>{result.data.data.name}</h3>
              <p>{result.data.data.alterEgo}</p>
            </div>
          )
        ))}
      </main>
    </Layout>
  );
};

export default DynamicParallelQueries;
