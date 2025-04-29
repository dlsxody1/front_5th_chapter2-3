import { useAtom } from "jotai"
import {
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "../model/atoms"

import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared"
import { Dialog } from "@radix-ui/react-dialog"
import { useUpdateComment } from "../model/hooks/useUpdateComment"

export const CommentForm: React.FC = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const { mutate, isPending } = useUpdateComment()

  const handleAddComment = () => {
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: 0, userId: 1 })
  }

  const handleUpdateComment = () => {
    if (selectedComment) {
      mutate({ id: newComment.userId, body: newComment.body })
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
            <Button onClick={handleAddComment} disabled={!newComment.body}>
              댓글 추가
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
            <Button onClick={handleUpdateComment} disabled={isPending || !selectedComment?.body}>
              {isPending ? "업데이트 중..." : "댓글 업데이트"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
