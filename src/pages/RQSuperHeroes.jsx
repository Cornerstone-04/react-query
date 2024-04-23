import React from "react";
import Layout from "../components/Layout";
import { HeroCard, ResponseLayout } from "../components";
import PrimaryBtn from "../assets/Buttons";
import toast from "react-hot-toast";
import { getSuperHeroes } from "../hooks/getSuperHeroesData";
import useSuperHeroes from "../utils/store/superHeroes";

const RQSuperHeroes = () => {
  const { setSuperHeroes } = useSuperHeroes();

  const onSuccess = (data) => {
    console.log("Fetched Data:", data);
    setSuperHeroes(data);
    toast.success("Data fetched successfully");
  };
  const onError = (error) => {
    console.error("Error fetching data:", error);
    toast.error("Error fetching data: ");
  };

  //destructure request element
  const { data, error, isError, isLoading, refetch } = getSuperHeroes(
    onSuccess,
    onError
  );

  // loading state
  if (isLoading) return <ResponseLayout text="Loading..." />;

  // error state
  if (isError) return <ResponseLayout text={error.message} />;

  return (
    <Layout>
      <main className="w-full flex flex-col gap-4 p-4">
        <header className="w-full font-bold flex justify-between items-center">
          <h2 className="text-2xl font bold text-slate-800">RQ Super Heroes</h2>
          <PrimaryBtn action={refetch} label="Fetch Heroes" />
        </header>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4">
          {Array.isArray(data) ? (
            data.map(({ alterEgo, id, name }) => (
              <HeroCard
                key={id}
                id={id}
                name={name}
                alterEgo={alterEgo}
                link={`/rq-super-heroes/${id}`}
              />
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
