import { useAtom } from "jotai"
import {
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "../model/atoms"
import { useCommentMutations } from "../model/hooks/useCommentMutation"
import { Dialog, DialogContent } from "@radix-ui/react-dialog"
import { Button, DialogHeader, DialogTitle, Textarea } from "../../../shared"

export const CommentForm: React.FC = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const { addComment, updateComment, isAddingComment, isUpdatingComment } = useCommentMutations()

  const handleAddComment = () => {
    addComment(newComment)
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: 0, userId: 1 })
  }

  const handleUpdateComment = () => {
    if (selectedComment) {
      updateComment({ id: selectedComment.id, body: selectedComment.body })
      setShowEditCommentDialog(false)
    }
  }

  return (
    <>
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={handleAddComment} disabled={isAddingComment || !newComment.body}>
              {isAddingComment ? "추가 중..." : "댓글 추가"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={handleUpdateComment} disabled={isUpdatingComment || !selectedComment?.body}>
              {isUpdatingComment ? "업데이트 중..." : "댓글 업데이트"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
