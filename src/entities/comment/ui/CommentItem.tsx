import { useAtomValue, useSetAtom } from "jotai"
import { searchQueryAtom } from "../../../features/post/model/atoms"
import { selectedCommentAtom, showEditCommentDialogAtom } from "../../../features/comment/model/atoms"
import { useCommentMutations } from "../../../features/comment/model/hooks/useCommentMutation"
import { highlightText } from "../../../shared/lib/highlightText"
import { Button } from "../../../shared"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Comment } from "../model/types"

export const CommentItem = ({ comment }: { comment: Comment }) => {
  const searchQuery = useAtomValue(searchQueryAtom)
  const setSelectedComment = useSetAtom(selectedCommentAtom)
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom)
  const { deleteComment, likeComment } = useCommentMutations()

  const handleEditClick = () => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  const handleDeleteClick = () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteComment(comment.id)
    }
  }

  const handleLikeClick = () => {
    likeComment({ id: comment.id, likes: comment.likes + 1 })
  }

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user?.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleLikeClick}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleEditClick}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDeleteClick}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
