import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePost } from "../../../../shared/api/posts"

export const useUpdatePostQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: { title: string; body: string } }) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["posts", "tag"] })
      queryClient.invalidateQueries({ queryKey: ["posts", "search"] })
    },
  })
}
