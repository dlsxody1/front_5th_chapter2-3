import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComment, deleteComment, likeComment, updateComment } from "../../../../shared/api/comments"

export const useCommentMutations = () => {
  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => updateComment(id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })

  const likeCommentMutation = useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })

  return {
    addComment: addCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    likeComment: likeCommentMutation.mutate,
    isAddingComment: addCommentMutation.isPending,
    isUpdatingComment: updateCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
    isLikingComment: likeCommentMutation.isPending,
  }
}
