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
        queryClient.setQueriesData({ queryKey: ["comments", newComment.postId] }, (oldData: CommentQueryProps) => {
          if (!oldData) return oldData

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
