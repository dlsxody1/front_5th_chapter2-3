import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeComment } from "../../../../shared/api/comments"

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}
