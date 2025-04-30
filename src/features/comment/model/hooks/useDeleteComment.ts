import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../../../shared/api/comments"
import { CommentQueryProps } from "../../../../entities/comment/model/types"

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, id) => {
      // 모든 comments 쿼리 업데이트
      queryClient.setQueriesData({ queryKey: ["comments"] }, (oldData: CommentQueryProps) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          comments: oldData.comments.filter((comment) => comment.id !== id),
          total: oldData.total > 0 ? oldData.total - 1 : 0,
        }
      })
    },
  })
}
