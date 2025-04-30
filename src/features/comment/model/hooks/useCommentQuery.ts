import { useQuery } from "@tanstack/react-query"
import { fetchComments } from "../../../../entities/comment/api/comments"

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  })
}
