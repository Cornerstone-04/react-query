import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axiosApi from "../../api/axios";
import useSuperHeroes from "../utils/store/superHeroes";
import toast from "react-hot-toast";

const SuperHeroes = () => {
  const { superHeroes, setSuperHeroes } = useSuperHeroes();
  // const [isLoading, setIsLoading] = useState(false);

  const fetchSuperHeroes = async () => {
    // setIsLoading(true);
    const toastId = "loadingToast";
    toast.loading("fetching data...", { id: toastId });

    try {
      const response = await axiosApi.get("/superheroes");
      console.log(response);
      if (response.status === 200) {
        setSuperHeroes(response.data);
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch superheroes", { id: toastId });
    } finally {
      // setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    fetchSuperHeroes();
  }, []);

  return (
    <Layout>
      <main className="w-full flex flex-col gap-4 p-4">
        <header className="w-full font-bold">
          <h2 className="text-2xl font bold">Super Heroes</h2>
        </header>
        <div>
          {superHeroes && superHeroes.length > 0 ? (
            superHeroes.map(({ alterEgo, id, name }) => (
              <div key={id}>
                <p>{name}</p>
              </div>
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
