import { useAtom, useAtomValue } from "jotai"
import { searchQueryAtom, selectedPostAtom, showPostDetailDialogAtom } from "../model/atoms"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogHeader, DialogTitle } from "../../../shared"
import { highlightText } from "../../../shared/lib/highlightText"
import CommentList from "../../comment/ui/CommentList"

export const PostDetail = () => {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const selectedPost = useAtomValue(selectedPostAtom)
  const searchQuery = useAtomValue(searchQueryAtom)

  if (!selectedPost) return null

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          <CommentList postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
