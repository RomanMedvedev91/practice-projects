import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import PostsList1 from "./PostsList1";
import { useState } from "react";
const POSTS = [
  {id: "1", title: "post 1" },
  {id: "2", title: "post 2" },
]
// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", { authorId: 1 }]
// /posts/2/comments -> ["posts", post.id, "comments"]

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <>
      <div>
        <button onClick={() => setCurrentPage(<PostsList1 />)}>Post List 1</button>
        <button onClick={() => setCurrentPage(<PostsList2 />)}>Post List 2</button>
        <button onClick={() => setCurrentPage(<Post id={1} />)}>1st post</button>
        <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>New post</button>
      </div>
    </>
  )
}

function wait(duration: number) {
  return new Promise(res => setTimeout(res, duration))
}
export default App
