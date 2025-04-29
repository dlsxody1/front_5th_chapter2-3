import { PostAddDialog } from "./PostAddDialog"
import { PostEditDialog } from "./PostEditDialog"

/** Widget으로 넘겨야할까? */
export const PostForm: React.FC = () => {
  return (
    <>
      <PostAddDialog />
      <PostEditDialog />
    </>
  )
}
