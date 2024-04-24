import React from "react";
import { HeroCard, Layout, ResponseLayout } from "../components";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axios";

const fetchSuperHeroes = async () => {
  try {
    const response = await axiosApi.get("/superheroes");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching superheroes:", error);
    throw error;
  }
};
const fetchFriends = async () => {
  try {
    const response = await axiosApi.get("/friends");
    if (response.status === 200) {
      return response.data; // Ensure this is the expected array
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching superheroes:", error);
    throw error; // This should trigger onError
  }
};

const ParallelQueries = () => {
  const {
    data: superHeroes,
    isError: isSuperHeroesError,
    error: superHeroesError,
    isLoading: isSuperHeroesLoading,
  } = useQuery({ queryKey: ["superheroes"], queryFn: fetchSuperHeroes });

  const {
    data: friends,
    isError: isFriendsError,
    error: friendsError,
    isLoading: isFriendsLoading,
  } = useQuery({ queryKey: ["friends"], queryFn: fetchFriends });

  if (isSuperHeroesError || isFriendsError)
    return (
      <ResponseLayout
        text={superHeroesError?.message || friendsError?.message}
      />
    );

  if (isSuperHeroesLoading || isFriendsLoading)
    return <ResponseLayout text={"Loading..."} />;

  return (
    <Layout>
      <main className="w-full flex flex-col gap-8 p-4">
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-slate-700">Superheroes</h3>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4">
            {superHeroes?.map(({ id, name }) => (
              <HeroCard key={id} name={name} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-slate-700">Friends</h3>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-4">
            {friends?.map(({ id, name }) => (
              <HeroCard key={id} name={name} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ParallelQueries;
