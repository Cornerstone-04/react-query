import { create } from "zustand"
import { persist } from "zustand/middleware"

const useSuperHeroes = create(
    persist(
        (set) => ({
            superHeroes: [],
            setSuperHeroes: (newSuperHeroes) => set({ superHeroes: newSuperHeroes }),
            clearStore: () => {
                set({ superHeroes: [] }, false)
                localStorage.removeItem("userCart")
            }
        }),
        { name: "superHeroes" }
    )
)

export default useSuperHeroes