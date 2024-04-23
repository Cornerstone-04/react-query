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

33 Data Transformation

```Javascript
//React query provides configuration in useQuery hook
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
