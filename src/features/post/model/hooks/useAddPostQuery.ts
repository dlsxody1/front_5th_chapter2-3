import { useMutation, useQueryClient } from "@tanstack/react-query"

import { limitAtom, skipAtom, sortByAtom, sortOrderAtom } from "../atoms"
import { useAtomValue } from "jotai"
import { addPost } from "../../../../entities/post/api/posts"

const useAddPostQuery = () => {
  const queryClient = useQueryClient()
  const skip = useAtomValue(skipAtom)
  const limit = useAtomValue(limitAtom)
  const sortBy = useAtomValue(sortByAtom)
  const sortOrder = useAtomValue(sortOrderAtom)

  return useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["posts", skip, limit], (oldData: any) => {
        if (!oldData) return oldData

        const updatedPosts = [...oldData.posts]

        // 적절한 위치에 새 게시물 추가
        if (sortBy === "id") {
          if (sortOrder === "asc") {
            // ID 오름차순
            updatedPosts.push(newPost)
            updatedPosts.sort((a, b) => a.id - b.id)
          } else {
            // ID 내림차순
            updatedPosts.unshift(newPost)
            updatedPosts.sort((a, b) => b.id - a.id)
          }
        } else {
          // 기본적으로 맨 앞에 추가
          updatedPosts.unshift(newPost)
        }

        return {
          ...oldData,
          posts: updatedPosts.slice(0, Math.max(limit, oldData.posts.length)),
          total: oldData.total + 1,
        }
      })

      // 다른 관련 쿼리도 업데이트
      if (newPost.tags && newPost.tags.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newPost.tags.forEach((tag: any) => {
          queryClient.invalidateQueries({ queryKey: ["posts", "tag", tag] })
        })
      }
    },
  })
}

export default useAddPostQuery
