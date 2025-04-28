import { User } from "../../types"

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user?: User
}
