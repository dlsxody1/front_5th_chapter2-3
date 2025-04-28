import { useAtom, useAtomValue } from "jotai"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Post } from "../../../entities/post/model/types"
import { postsAtom } from "../../../entities/post/model/atoms"
import {
  searchQueryAtom,
  selectedTagAtom,
  selectedPostAtom,
  showEditDialogAtom,
  showPostDetailDialogAtom,
  showUserModalAtom,
} from "../model/atoms"
import { deletePost } from "../../../shared/api/posts"
import { fetchUser } from "../../../shared/api/users"
import { selectedUserAtom } from "../../../entities/user/model/atom"

const PostTable = () => {
  const navigate = useNavigate()

  // 상태 구독
  const [posts, setPosts] = useAtom(postsAtom)
  const searchQuery = useAtomValue(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [, setSelectedPost] = useAtom(selectedPostAtom)
  const [, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [, setSelectedUser] = useAtom(selectedUserAtom)
  const [, setShowUserModal] = useAtom(showUserModalAtom)

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 텍스트 하이라이트 함수
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  // 유저 모달 열기
  const openUserModal = async (user: Post["author"]) => {
    if (user?.id) {
      try {
        const userData = await fetchUser(user.id)
        setSelectedUser(userData)
        setShowUserModal(true)
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error)
      }
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 게시물 삭제
  const deletePostHandler = async (id: number) => {
    try {
      await deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && openUserModal(post.author)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePostHandler(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
