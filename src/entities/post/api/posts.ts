import { baseApi } from "../../../shared/api/common"
import { Post } from "../model/types"

interface PostsResponse {
  posts: Post[]
  total: number
}

export const fetchPosts = async (params: { limit: number; skip: number }): Promise<PostsResponse> => {
  const response = await baseApi.get("/posts", { params })
  return response.data
}

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await baseApi.get("/posts/search", { params: { q: query } })
  return response.data
}

export const fetchPostsByTag = async (tag: string): Promise<PostsResponse> => {
  const response = await baseApi.get(`/posts/tag/${tag}`)
  return response.data
}

export const addPost = async (post: { title: string; body: string; userId: number }): Promise<Post> => {
  const response = await baseApi.post("/posts/add", post)
  return response.data
}

export const updatePost = async (id: number, post: { title: string; body: string }): Promise<Post> => {
  const response = await baseApi.put(`/posts/${id}`, post)
  return response.data
}

export const deletePost = async (id: number): Promise<void> => {
  await baseApi.delete(`/posts/${id}`)
}

export const fetchTags = async (): Promise<{ slug: string; url: string }[]> => {
  const response = await baseApi.get("/posts/tags")
  return response.data
}
