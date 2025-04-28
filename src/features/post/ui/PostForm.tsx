import { useAtom } from "jotai"
import { newPostAtom, selectedPostAtom, showAddDialogAtom, showEditDialogAtom } from "../model/atoms"
import { usePostMutation } from "../model/hooks/usePostMutation"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Input, Textarea } from "../../../shared"

export const PostForm: React.FC = () => {
  // 상태 값
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)

  // 뮤테이션
  const { addPost, updatePost, isAddingPost, isUpdatingPost } = usePostMutation()

  // 게시물 추가 처리
  const handleAddPost = () => {
    addPost(newPost)
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  // 게시물 수정 처리
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
    <>
      {/* 게시물 추가 대화상자 */}
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
            <Button onClick={handleAddPost} disabled={isAddingPost || !newPost.title || !newPost.body}>
              {isAddingPost ? "추가 중..." : "게시물 추가"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
            <Button onClick={handleUpdatePost} disabled={isUpdatingPost || !selectedPost?.title || !selectedPost?.body}>
              {isUpdatingPost ? "업데이트 중..." : "게시물 업데이트"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
