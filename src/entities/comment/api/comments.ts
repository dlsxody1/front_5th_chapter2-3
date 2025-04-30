import { baseApi } from "../../../shared/api/common"
import { Comment, CommentQueryProps } from "../model/types"

export const fetchComments = async (postId: number): Promise<CommentQueryProps> => {
  const response = await baseApi.get(`/comments/post/${postId}`)
  return response.data
}

export const addComment = async (comment: { body: string; postId: number; userId: number }): Promise<Comment> => {
  const response = await baseApi.post("/comments/add", comment)
  return response.data
}

export const updateComment = async (id: number, body: string): Promise<Comment> => {
  const response = await baseApi.put(`/comments/${id}`, { body })
  return response.data
}

export const deleteComment = async (id: number): Promise<void> => {
  await baseApi.delete(`/comments/${id}`)
}

export const likeComment = async (id: number, likes: number): Promise<Comment> => {
  const response = await baseApi.patch(`/comments/${id}`, { likes })
  return response.data
}
