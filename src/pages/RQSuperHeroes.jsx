import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axios";
import useSuperHeroes from "../utils/store/superHeroes";
import { HeroCard } from "../components";
import PrimaryBtn from "../assets/Buttons";

const RQSuperHeroes = () => {
  const { setSuperHeroes } = useSuperHeroes();
  const fetchSuperHeroes = async () => {
    try {
      const response = await axiosApi.get("/superheroes");
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    }
  };

  //destructure request element
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    options: {
      // cacheTime: 5000,
      // staleTime: 0,
      // refetchOnMount: true, // or false or "always"
      refetchOnWindowFocus: true, // data is fetched again when your window loses and regains focus
      refetchInterval: false, // for polling
      enabled: false, // to deactivate automatic fetching on page load (change event of query)
      /*
       * Caching allows users to view previously loaded data without loading delay.
       * Caching reduces the number of data requests for data that doesn't change often.
       *
       * Polling is the process of fetching data at regular intervals.
       * Automatic fetching is paused if the window loses focus.
       
      */
    },
    onSuccess: (data) => {
      console.log("Data fetched successfully", data);
    },
    onError: (error) => {
      console.log("Data fetch failed", error.message);
    },
  });

  useEffect(() => {
    if (data) {
      setSuperHeroes(data);
    }
  }, [data, setSuperHeroes]);

  // loading state
  if (isLoading) {
    return (
      <Layout>
        <main className="w-full flex flex-col gap-4 p-4">
          <header className="w-full font-bold">
            <h2 className="text-2xl font bold text-slate-800">Loading ...</h2>
          </header>
        </main>
      </Layout>
    );
  }

  // error state
  if (isError) {
    return (
      <Layout>
        <main className="w-full flex flex-col gap-4 p-4">
          <header className="w-full font-bold">
            <h2 className="text-2xl font bold text-slate-800">
              {error.message}
            </h2>
          </header>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="w-full flex flex-col gap-4 p-4">
        <header className="w-full font-bold flex justify-between items-center">
          <h2 className="text-2xl font bold text-slate-800">RQ Super Heroes</h2>
          <PrimaryBtn action={refetch} label="Fetch Heroes" />
        </header>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4">
          {data ? (
            data.map(({ alterEgo, id, name }) => (
              <HeroCard key={id} id={id} name={name} alterEgo={alterEgo} />
            ))
          ) : (
            <div>No heroes found</div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default RQSuperHeroes;
