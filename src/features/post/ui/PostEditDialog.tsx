import { useAtom } from "jotai"
import { selectedPostAtom, showEditDialogAtom } from "../model/atoms"
import { useUpdatePostQuery } from "../model/hooks/useUpdatePostQuery"
import { Dialog } from "@radix-ui/react-dialog"
import { Button, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared"

export const PostEditDialog = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const { mutate: updatePost, isPending: isUpdatePending } = useUpdatePostQuery()

  const handleUpdatePost = () => {
    if (selectedPost) {
      updatePost({
        id: selectedPost.id,
        post: {
          title: selectedPost.title,
          body: selectedPost.body,
        },
      })
      setShowEditDialog(false)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={handleUpdatePost} disabled={isUpdatePending || !selectedPost?.title || !selectedPost?.body}>
            {isUpdatePending ? "업데이트 중..." : "게시물 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
