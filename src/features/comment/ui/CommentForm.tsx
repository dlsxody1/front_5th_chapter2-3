import CommentAddDialog from "./CommentAddDialog"
import CommentUpdateDialog from "./CommentUpdateDialog"

export const CommentForm: React.FC = () => {
  return (
    <>
      <CommentAddDialog />
      <CommentUpdateDialog />
    </>
  )
}
