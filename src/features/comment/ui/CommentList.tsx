import { Button } from "../../../shared"
import { Plus } from "lucide-react"
import { CommentItem } from "../../../entities/comment/ui/CommentItem"
import { useCommentsQuery } from "../model/hooks/useCommentQuery"
import { newCommentAtom, showAddCommentDialogAtom } from "../model/atoms"
import { useSetAtom } from "jotai"

const CommentList = ({ postId }: { postId: number }) => {
  const { data, isLoading } = useCommentsQuery(postId)

  const setNewComment = useSetAtom(newCommentAtom)
  const setShowAddCommentDialog = useSetAtom(showAddCommentDialogAtom)

  const handleAddCommentClick = () => {
    setNewComment({ body: "", postId, userId: 1 })
    setShowAddCommentDialog(true)
  }

  if (isLoading) {
    return <div>댓글 로딩 중...</div>
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleAddCommentClick}>
          <Plus className="w-3 h-3" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {data && data.comments.length > 0 ? (
          data.comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        ) : (
          <div className="text-sm text-gray-500">아직 댓글이 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default CommentList
