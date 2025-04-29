import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../../../../shared/api/posts"

export const useDeletePostQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "posts",
      })
    },
  })
}
