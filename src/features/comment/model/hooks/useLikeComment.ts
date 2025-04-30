import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeComment } from "../../../../entities/comment/api/comments"
import { CommentQueryProps } from "../../../../entities/comment/model/types"

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onSuccess: (_, variables) => {
      // 현재 댓글 쿼리를 업데이트
      queryClient.setQueriesData({ queryKey: ["comments"] }, (oldData: CommentQueryProps) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          comments: oldData.comments.map((comment) =>
            comment.id === variables.id ? { ...comment, likes: variables.likes } : comment,
          ),
        }
      })
    },
  })
}
