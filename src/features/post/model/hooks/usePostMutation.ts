import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPost, deletePost, updatePost } from "../../../../shared/api/posts"

export const usePostMutation = () => {
  const queryClient = useQueryClient()

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: { title: string; body: string } }) => updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  return {
    addPost: addPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isAddingPost: addPostMutation.isPending,
    isUpdatingPost: updatePostMutation.isPending,
    isDeletingPost: deletePostMutation.isPending,
  }
}
