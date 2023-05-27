import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
const POSTS = [
  {id: "1", title: "post 1" },
  {id: "2", title: "post 2" },
]
function App() {
  const queryClient = useQueryClient()
  const poststQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  })
  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() => 
      POSTS.push({ id: crypto.randomUUID(), title }))
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })
  if (poststQuery.isLoading) return <h1>Loading...</h1>
  if (poststQuery.isError) return <h1>{JSON.stringify(poststQuery.error)}</h1>
  return (
    <>
      <div>
        {poststQuery.data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        <button onClick={() => newPostMutation.mutate("new posts")}>click</button>
      </div>
    </>
  )
}

function wait(duration: number) {
  return new Promise(res => setTimeout(res, duration))
}
export default App
