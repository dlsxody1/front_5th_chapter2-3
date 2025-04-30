import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../../../shared/api/comments"

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      const commentQueries = queryClient.getQueriesData({ queryKey: ["comments"] })
      commentQueries.forEach(([queryKey]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData) return oldData
          return Array.isArray(oldData) ? oldData.filter((comment) => comment.id !== variables) : oldData
        })
      })
    },
  })
}
