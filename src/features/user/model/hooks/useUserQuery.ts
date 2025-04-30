import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../../../../entities/user/api/users"

export const useUserQuery = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  })
}
