import { useAtom } from "jotai"
import { newPostAtom, showAddDialogAtom } from "../model/atoms"
import useAddPostQuery from "../model/hooks/useAddPostQuery"
import { Dialog } from "@radix-ui/react-dialog"
import { Button, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared"

export const PostAddDialog = () => {
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const { mutate: addPost, isPending: isAddPending } = useAddPostQuery()

  const handleAddPost = () => {
    addPost(newPost)
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost} disabled={isAddPending || !newPost.title || !newPost.body}>
            {isAddPending ? "추가 중..." : "게시물 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
