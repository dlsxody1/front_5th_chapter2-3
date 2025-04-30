import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../../../../entities/comment/api/comments"
import { CommentQueryProps } from "../../../../entities/comment/model/types"

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => updateComment(id, body),
    onSuccess: (_, variables) => {
      // 해당 댓글이 속한 포스트의 댓글 목록 업데이트
      queryClient.setQueriesData({ queryKey: ["comments"] }, (oldData: CommentQueryProps) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          comments: oldData.comments.map((comment) =>
            comment.id === variables.id ? { ...comment, body: variables.body } : comment,
          ),
        }
      })
    },
  })
}
