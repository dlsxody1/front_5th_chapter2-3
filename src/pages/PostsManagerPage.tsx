import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared"
import { FilterBar } from "../features/post/ui/FilterBar"
import { PostsTable } from "../features/post/ui/PostTable"
import { PostForm } from "../features/post/ui/PostForm"
import { CommentForm } from "../features/comment/ui/CommentForm"
import { PostDetail } from "../features/post/ui/PostDetail"
import { UserCard } from "../entities/user/ui/UserCard"
import { useSetAtom } from "jotai"
import { showAddDialogAtom } from "../features/post/model/atoms"
import { Plus } from "lucide-react"

const PostsManager = () => {
  const setShowAddDialog = useSetAtom(showAddDialogAtom)
  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <Button
              onClick={() => {
                setShowAddDialog(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              게시물 추가
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 검색 및 필터 컨트롤 */}
            <FilterBar />
            {/* 게시물 테이블 */}
            <PostsTable />
            {/* 페이지네이션 */}
          </div>
        </CardContent>
        <PostForm />
        <CommentForm />

        <PostDetail />

        <UserCard />
      </Card>
    </>
  )
}

export default PostsManager
