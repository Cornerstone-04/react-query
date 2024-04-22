import { create } from "zustand"
import { persist } from "zustand/middleware"

const setSuperHeroes = (set) => (newSuperHeroes) => {
    set({ superHeroes: newSuperHeroes });
};

const clearStore = (set) => () => {
    set({ superHeroes: [] });
    localStorage.removeItem("superHeroes-storage");
};

const useSuperHeroes = create(
    persist(
        (set) => ({
            superHeroes: [],
            setSuperHeroes: setSuperHeroes(set),
            clearStore: clearStore(set)
        }),
        {
            name: "superHeroes",
            getStorage: () => localStorage
        }
    )
)

export default useSuperHeroes
