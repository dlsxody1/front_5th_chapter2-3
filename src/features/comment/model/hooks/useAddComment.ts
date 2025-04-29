import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComment } from "../../../../shared/api/comments"

export const useAddComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}
