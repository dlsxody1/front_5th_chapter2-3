import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../../../../shared/api/comments"

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => updateComment(id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}
