import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useQuery } from "react-query";
import axiosApi from "../../api/axios";
import useSuperHeroes from "../utils/store/superHeroes";
import { HeroCard } from "../components";

const RQSuperHeroes = () => {
  const { setSuperHeroes } = useSuperHeroes();
  const fetchSuperHeroes = async () => {
    const response = await axiosApi.get("/superheroes");
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  };

  //destructure request element
  const { data, error, isError, isLoading } = useQuery(
    "super-heroes", //query-key
    fetchSuperHeroes //api function
    // { cacheTime: 5000 } to configure cache time
  );

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
        <header className="w-full font-bold">
          <h2 className="text-2xl font bold text-slate-800">RQ Super Heroes</h2>
        </header>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4">
          {data?.map(({ alterEgo, id, name }) => (
            <HeroCard id={id} name={name} alterEgo={alterEgo} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default RQSuperHeroes;
