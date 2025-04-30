import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostQueryProps } from "../../../../entities/post/model/types"
import { updatePost } from "../../../../entities/post/api/posts"

export const useUpdatePostQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: { title: string; body: string } }) => updatePost(id, post),
    onSuccess: (_, variables) => {
      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: PostQueryProps) => {
        if (!oldData) return oldData

        const updatedPosts = oldData.posts.map((post) =>
          post.id === variables.id ? { ...post, ...variables.post } : post,
        )

        return {
          ...oldData,
          posts: updatedPosts,
        }
      })
    },
  })
}
