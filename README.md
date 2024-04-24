# React Query Notes

- Caching allows users to view previously loaded data without loading delay.
- Caching reduces the number of data requests for data that doesn't change often.
- Polling is the process of fetching data at regular intervals.
- Automatic fetching is paused if the window loses focus.

```javascript
const { data, error, isError, isLoading, refetch } = useQuery({
  queryKey: ["super-heroes"],
  queryFn: fetchSuperHeroes,
  enabled: false, // to deactivate automatic fetching on page load (change event of query)
  cacheTime: 5000, //alter cache time
  staleTime: 0,
  refetchOnMount: true, // or false or "always"
  refetchOnWindowFocus: false, //data is fetched again when your window loses and regains focus
  refetchInterval: false, // for polling
  onSuccess: (data) => {
    console.log("Data fetched successfully", data);
    toast.success("Data fetched successfully");
  },
  onError: (error) => {
    console.log("Data fetch failed", error.message);
    toast.error("Data fetch failed: " + error.message);
  },
});
```

## Data Transformation

- React query provides configuration in useQuery hook, by using the `select` option

```Javascript
const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });
```

## Custome hooks

- Create custom hooks for larger applications

```Javascript
export const getSuperHeroes = (onSuccess, onError) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    onSuccess,
    onError,
  });
};
```

## Query by id

- Create a new page that will eventually display the details about one single super hero.
- Configure the route to that page and add a link from the super heroes list page to the super hero detais page.
- Fetch a superhero by id and display the details in the UI.
- Custome hook

```Javascript
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

```

- Dynamic page

```Javascript
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

```

- Configure Route

```Javascript
  <Route path="/rq-super-heroes/:id" element={<RQSingleHero />} />
```

## Parallel Queries

- Make simultaneous requests on a page by calling useQuery twice.
- Avoid error by destructuring with an alias

```Javascript
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
```
