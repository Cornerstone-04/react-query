import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearStore, setSuperHeroes } from "./heroActions";

const heroActions = (set) => ({
  clearStore: clearStore(set),
  setSuperHeroes: setSuperHeroes(set),
});

const useSuperHeroes = create(
  persist(
    (set) => ({
      superHeroes: [],
      ...heroActions(set),
    }),
    {
      name: "superHeroes",
      storage: localStorage,
    }
  )
);

export default useSuperHeroes;
