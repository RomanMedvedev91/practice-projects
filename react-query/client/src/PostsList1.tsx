import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts';

export default function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postsQuery.status === "loading") return <h1>loading...</h1>
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }
  
  return (
    <div>
      <h1>PostsList1</h1>
      <ol>
        {postsQuery.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}
