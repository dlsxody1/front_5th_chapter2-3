export const fetchUsers = async (params?: { limit?: number; select?: string }) => {
  const queryParams = new URLSearchParams()
  if (params?.limit !== undefined) queryParams.set("limit", params.limit.toString())
  if (params?.select) queryParams.set("select", params.select)

  const response = await fetch(`/api/users?${queryParams.toString()}`)
  return response.json()
}

export const fetchUser = async (id: number) => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
