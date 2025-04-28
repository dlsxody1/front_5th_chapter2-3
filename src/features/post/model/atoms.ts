// features/postManagement/model/store.ts 수정
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Post } from "../../../entities/post/model/types"

// 페이지네이션 상태 (localStorage에 저장)
export const skipAtom = atomWithStorage<number>("posts-skip", 0)
export const limitAtom = atomWithStorage<number>("posts-limit", 10)

// 필터링 및 정렬 상태 (localStorage에 저장)
export const searchQueryAtom = atomWithStorage<string>("posts-search", "")
export const sortByAtom = atomWithStorage<string>("posts-sortBy", "")
export const sortOrderAtom = atomWithStorage<string>("posts-sortOrder", "asc")
export const selectedTagAtom = atomWithStorage<string>("posts-tag", "")

// 로딩 상태
export const loadingAtom = atom<boolean>(false)

// 선택된 포스트
export const selectedPostAtom = atom<Post | null>(null)

// 댓글 상태 추가
export const commentsAtom = atom<Record<number, Comment[]>>({})

// 대화상자 상태
export const showAddDialogAtom = atom<boolean>(false)
export const showEditDialogAtom = atom<boolean>(false)
export const showPostDetailDialogAtom = atom<boolean>(false)
export const showUserModalAtom = atom<boolean>(false)

// 신규 포스트
export const newPostAtom = atom<Omit<Post, "id">>({
  title: "",
  body: "",
  userId: 1,
})

// 사용자 관련
export const selectedUserIdAtom = atom<number | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectedUserAtom = atom<any | null>(null)
