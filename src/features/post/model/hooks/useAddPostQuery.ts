import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPost } from "../../../../shared/api/posts"

const useAddPostQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export default useAddPostQuery
