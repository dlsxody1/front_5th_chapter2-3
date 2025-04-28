import { atom } from "jotai"
import { Comment } from "./types"

export const commentsAtom = atom<Record<number, Comment[]>>({})
