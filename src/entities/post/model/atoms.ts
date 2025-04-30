import { atom } from "jotai"
import { fetchPosts } from "../api/posts"

export const postsAtom = atom(async () => {
  const response = await fetchPosts({ limit: 10, skip: 0 })
  return response.posts
})
export const totalPostsAtom = atom<number>(0)
