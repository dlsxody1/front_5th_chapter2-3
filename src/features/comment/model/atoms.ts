import { atom } from "jotai"
import { Comment } from "../../../entities/comment/model/types"

export const selectedCommentAtom = atom<Comment | null>(null)
export const newCommentAtom = atom<Omit<Comment, "id" | "likes">>({
  body: "",
  postId: null as unknown as number,
  userId: 1,
})

export const showAddCommentDialogAtom = atom<boolean>(false)
export const showEditCommentDialogAtom = atom<boolean>(false)
