import { User } from "../../user/model/types"

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user?: User
}

export interface CommentQueryProps {
  comments: Comment[]
  limit: number
  skip: number
  total: 2
}
