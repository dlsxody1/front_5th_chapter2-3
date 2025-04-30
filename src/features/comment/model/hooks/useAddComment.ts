import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComment } from "../../../../shared/api/comments"

export const useAddComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.setQueryData(["comments", data.postId], () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] })
      })
    },
  })
}
