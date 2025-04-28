export const fetchPosts = async (params: { limit: number; skip: number }) => {
  const response = await fetch(`/api/posts?limit=${params.limit}&skip=${params.skip}`)
  return response.json()
}

export const searchPosts = async (query: string) => {
  const response = await fetch(`/api/posts/search?q=${query}`)
  return response.json()
}

export const fetchPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  return response.json()
}

export const addPost = async (post: { title: string; body: string; userId: number }) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const updatePost = async (id: number, post: { title: string; body: string }) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const deletePost = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}

export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  return response.json()
}
