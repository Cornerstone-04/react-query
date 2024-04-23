import React from "react";
import { Layout, ResponseLayout } from "../components";
import { useParams } from "react-router-dom";
import { getSuperHero } from "../hooks/getSuperHeroData";

const RQSingleHero = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = getSuperHero(id);

  if (isLoading) return <ResponseLayout text="Loading..." />;
  if (isError) return <ResponseLayout text={error.message} />;

  return (
    <Layout>
      <main className="w-full flex flex-col gap-4 p-4">
        <header className="w-full font-bold">
          <h2 className="text-2xl font bold text-slate-800">
            {data.name} - {data.alterEgo}
          </h2>
        </header>
      </main>
    </Layout>
  );
};

export default RQSingleHero;
