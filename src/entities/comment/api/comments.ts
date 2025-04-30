import { Comment, CommentQueryProps } from "../model/types"

export const fetchComments = async (postId: number): Promise<CommentQueryProps> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return response.json()
}

export const addComment = async (comment: { body: string; postId: number; userId: number }): Promise<Comment> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export const updateComment = async (id: number, body: string): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  return response.json()
}

export const deleteComment = async (id: number): Promise<void> => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

export const likeComment = async (id: number, likes: number): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  return response.json()
}
