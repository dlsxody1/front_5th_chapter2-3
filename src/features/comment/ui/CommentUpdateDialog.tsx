import { selectedCommentAtom, showEditCommentDialogAtom } from "../model/atoms"
import { useAtom } from "jotai"
import { useUpdateComment } from "../model/hooks/useUpdateComment"
import { Dialog } from "@radix-ui/react-dialog"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared"

const CommentUpdateDialog = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const { mutate, isPending } = useUpdateComment()

  const handleUpdateComment = () => {
    if (selectedComment) {
      mutate({ id: selectedComment.id, body: selectedComment.body })
      setShowEditCommentDialog(false)
    }
  }
  return (
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
  )
}

export default CommentUpdateDialog
