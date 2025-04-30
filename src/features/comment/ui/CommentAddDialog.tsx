import { useAddComment } from "../model/hooks/useAddComment"
import { useAtom } from "jotai"
import { newCommentAtom, showAddCommentDialogAtom } from "../model/atoms"
import { Dialog } from "@radix-ui/react-dialog"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared"

const CommentAddDialog = () => {
  const { mutate: addComment, isPending: isAddPending } = useAddComment()
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)

  const handleAddComment = () => {
    if (newComment.body && newComment.postId) {
      addComment(newComment)
      setShowAddCommentDialog(false)
    }
  }
  return (
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
          <Button onClick={handleAddComment}>{isAddPending ? "추가 중..." : "댓글 추가"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddDialog
