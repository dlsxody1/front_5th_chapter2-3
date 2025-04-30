import { baseApi } from "../../../shared/api/common"
import { User } from "../model/types"

export const fetchUsers = async (params?: { limit?: number; select?: string }): Promise<{ users: User[] }> => {
  const queryParams = new URLSearchParams()
  if (params?.limit !== undefined) queryParams.set("limit", params.limit.toString())
  if (params?.select) queryParams.set("select", params.select)

  const response = await baseApi(`/api/users?${queryParams.toString()}`)
  return response.data
}

export const fetchUser = async (id: number): Promise<User> => {
  const response = await baseApi.get(`/users/${id}`)
  return response.data
}
