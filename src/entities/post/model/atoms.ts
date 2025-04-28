import { atom } from "jotai"
import { Post } from "./types"

export const postsAtom = atom<Post[]>([])
export const totalPostsAtom = atom<number>(0)
