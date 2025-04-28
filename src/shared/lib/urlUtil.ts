export function createQueryParams(params: Record<string, string | number>): string {
  const cleanParams = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .reduce(
      (acc, [key, value]) => {
        acc[key] = typeof value === "number" ? value.toString() : value
        return acc
      },
      {} as Record<string, string>,
    )

  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(cleanParams)) {
    searchParams.set(key, value)
  }

  return searchParams.toString()
}

export function parseQueryParams(search: string) {
  const params = new URLSearchParams(search)

  return {
    skip: parseInt(params.get("skip") || "0"),
    limit: parseInt(params.get("limit") || "10"),
    search: params.get("search") || "",
    sortBy: params.get("sortBy") || "",
    sortOrder: params.get("sortOrder") || "asc",
    tag: params.get("tag") || "",
  }
}
