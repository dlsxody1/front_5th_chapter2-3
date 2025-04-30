import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../../../../entities/post/api/posts"

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  })
}
