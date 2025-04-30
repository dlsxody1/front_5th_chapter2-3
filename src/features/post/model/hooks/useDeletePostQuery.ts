import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../../../../shared/api/posts"
import { useAtomValue } from "jotai"
import { limitAtom, skipAtom } from "../atoms"

export const useDeletePostQuery = () => {
  const queryClient = useQueryClient()
  const skip = useAtomValue(skipAtom)
  const limit = useAtomValue(limitAtom)

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedPostId) => {
      // 현재 페이지네이션된 포스트 쿼리를 업데이트
      queryClient.setQueriesData({ queryKey: ["posts", skip, limit] }, (oldData) => {
        // oldData가 없으면 무시
        if (!oldData) return oldData

        // 배열이 아니면 그대로 반환
        if (!Array.isArray(oldData)) return oldData

        // 삭제된 포스트를 필터링
        return oldData.filter((post) => post.id !== deletedPostId)
      })

      // 검색 쿼리 업데이트
      queryClient.setQueriesData({ queryKey: ["posts", "search", ""] }, (oldData) => {
        if (!oldData) return oldData
        if (!Array.isArray(oldData)) return oldData
        return oldData.filter((post) => post.id !== deletedPostId)
      })

      // 태그 쿼리 업데이트
      queryClient.setQueriesData({ queryKey: ["posts", "tag", ""] }, (oldData) => {
        if (!oldData) return oldData
        if (!Array.isArray(oldData)) return oldData
        return oldData.filter((post) => post.id !== deletedPostId)
      })

      // 필요한 경우 다른 관련 쿼리도 무효화
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
