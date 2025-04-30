import { useAtomValue } from "jotai"
import { limitAtom, searchQueryAtom, selectedTagAtom, skipAtom, sortByAtom, sortOrderAtom } from "../atoms"
import { useQuery } from "@tanstack/react-query"
import { fetchPosts, fetchPostsByTag, searchPosts } from "../../../../shared/api/posts"
import { fetchUsers } from "../../../../shared/api/users"

export const usePostsQuery = () => {
  const skip = useAtomValue(skipAtom)
  const limit = useAtomValue(limitAtom)
  const selectedTag = useAtomValue(selectedTagAtom)
  const searchQuery = useAtomValue(searchQueryAtom)
  const sortBy = useAtomValue(sortByAtom)
  const sortOrder = useAtomValue(sortOrderAtom)

  // 기본 게시물 쿼리
  const postsQuery = useQuery({
    queryKey: ["posts", skip, limit],
    queryFn: () => fetchPosts({ skip, limit }),
    enabled: !selectedTag && !searchQuery,
  })

  // 태그별 게시물 쿼리
  const tagPostsQuery = useQuery({
    queryKey: ["posts", "tag", selectedTag],
    queryFn: () => fetchPostsByTag(selectedTag),
    enabled: !!selectedTag && selectedTag !== "all",
  })

  // 검색 쿼리
  const searchPostsQuery = useQuery({
    queryKey: ["posts", "search", searchQuery],
    queryFn: () => searchPosts(searchQuery),
    enabled: !!searchQuery,
  })

  // 사용자 정보 쿼리
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers({ limit: 0, select: "username,image" }),
  })

  // 수동 검색 트리거
  const performSearch = () => {
    if (searchQuery) {
      searchPostsQuery.refetch()
    }
  }

  // 결과 결합
  const getActiveQuery = () => {
    if (searchQuery) return searchPostsQuery
    if (selectedTag && selectedTag !== "all") return tagPostsQuery
    return postsQuery
  }

  const activeQuery = getActiveQuery()

  // 게시물에 사용자 정보 병합
  const postsWithUsers =
    activeQuery.data?.posts.map((post) => ({
      ...post,
      author: usersQuery.data?.users?.find((user) => user.id === post.userId),
    })) || []

  const sortedPosts = [...postsWithUsers].sort((a, b) => {
    if (!sortBy || sortBy === "none") return 0

    let valA, valB

    if (sortBy === "id") {
      valA = a.id
      valB = b.id
    } else if (sortBy === "title") {
      valA = a.title
      valB = b.title
    } else if (sortBy === "reactions") {
      valA = a.reactions?.likes || 0
      valB = b.reactions?.likes || 0
    } else {
      return 0
    }

    if (sortOrder === "asc") {
      return valA > valB ? 1 : -1
    } else {
      return valA < valB ? 1 : -1
    }
  })

  return {
    posts: sortedPosts,
    total: activeQuery.data?.total || 0,
    isLoading: activeQuery.isLoading || usersQuery.isLoading,
    isError: activeQuery.isError || usersQuery.isError,
    error: activeQuery.error || usersQuery.error,
    searchPosts: performSearch, // 검색 함수 추가
  }
}
