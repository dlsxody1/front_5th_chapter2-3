import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../../../../shared/api/posts"

export const useDeletePostQuery = () => {
  const queryClient = useQueryClient()

  useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
