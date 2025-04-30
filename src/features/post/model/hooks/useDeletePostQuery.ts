import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PostQueryProps } from "../../../../entities/post/model/types"
import { deletePost } from "../../../../entities/post/api/posts"

export const useDeletePostQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id: number) => {
      // 현재 페이지네이션된 포스트 쿼리를 업데이트
      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: PostQueryProps) => {
        if (!oldData) return oldData

        // 삭제된 포스트를 제외한 배열 생성
        const updatedPosts = oldData.posts.filter((post) => post.id !== id)

        return {
          ...oldData,
          posts: updatedPosts,
          total: oldData.total - 1,
        }
      })
    },
  })
}
