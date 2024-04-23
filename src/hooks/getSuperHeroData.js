import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axios";

const fetchSuperHero = async ({ queryKey }) => {
  const heroId = queryKey[1];
  try {
    const response = await axiosApi.get(`/superheroes/${heroId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch hero details");
    }
  } catch (error) {
    console.error("Error fetching superhero:", error);
    throw error;
  }
};

export const getSuperHero = (heroId) => {
  return useQuery({
    queryKey: ["superhero", heroId],
    queryFn: fetchSuperHero,
  });
};
