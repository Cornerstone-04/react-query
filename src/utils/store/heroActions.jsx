const setSuperHeroes = (set) => (newSuperHeroes) => {
  set({ superHeroes: newSuperHeroes });
};

const clearStore = (set) => () => {
  set({ superHeroes: [] });
  localStorage.removeItem("superHeroes-storage");
};

export { clearStore, setSuperHeroes };
