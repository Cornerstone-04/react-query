import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axiosApi from "../../api/axios";
import useSuperHeroes from "../utils/store/superHeroes";
import toast from "react-hot-toast";
import { HeroCard } from "../components";

const SuperHeroes = () => {
  const { superHeroes, setSuperHeroes } = useSuperHeroes();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSuperHeroes = async () => {
    try {
      const response = await axiosApi.get("/superheroes");
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuperHeroes();
  }, []);

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

  if (error) {
    return (
      <Layout>
        <main className="w-full flex flex-col gap-4 p-4">
          <header className="w-full font-bold">
            <h2 className="text-2xl font bold text-slate-800">{error}</h2>
          </header>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="w-full flex flex-col gap-4 p-4 justify-center">
        <header className="w-full font-bold">
          <h2 className="text-2xl font bold text-slate-800">Super Heroes</h2>
        </header>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4">
          {superHeroes && superHeroes.length > 0 ? (
            superHeroes.map(({ alterEgo, id, name }) => (
              <HeroCard id={id} name={name} alterEgo={alterEgo} />
            ))
          ) : (
            <div>
              <p>No super heroes found</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default SuperHeroes;
