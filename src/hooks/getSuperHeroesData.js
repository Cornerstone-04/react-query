import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axios";

const fetchSuperHeroes = async () => {
  try {
    const response = await axiosApi.get("/superheroes");
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

export const getSuperHeroes = (onSuccess, onError) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // config: {
    //   onSuccess,
    //   onError,
    // },
    onSuccess,
    onError,
  });
};
