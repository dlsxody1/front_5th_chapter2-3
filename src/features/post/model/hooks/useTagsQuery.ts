import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../../../../shared/api/posts"

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  })
}
