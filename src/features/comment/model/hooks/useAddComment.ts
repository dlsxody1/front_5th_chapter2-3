import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComment } from "../../../../shared/api/comments"
import { CommentQueryProps } from "../../../../entities/comment/model/types"

export const useAddComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      // 해당 포스트에 대한 댓글 목록만 업데이트 (포스트 ID별 쿼리가 있는 경우)
      if (newComment.postId) {
        // 모든 댓글 쿼리 업데이트
        queryClient.setQueryData(["comments"], (oldData: CommentQueryProps) => {
          if (!oldData) return { comments: [newComment], total: 1 }
          return {
            ...oldData,
            comments: [newComment, ...oldData.comments],
            total: oldData.total + 1,
          }
        })

        // 특정 포스트에 대한 댓글 쿼리도 업데이트
        queryClient.setQueryData(["comments", newComment.postId], (oldData: CommentQueryProps) => {
          if (!oldData) return { comments: [newComment], total: 1 }
          return {
            ...oldData,
            comments: [newComment, ...oldData.comments],
            total: oldData.total + 1,
          }
        })
      }
    },
  })
}
