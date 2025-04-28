export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: { likes: number; dislikes: number }
  author?: { id: number; username: string; image: string }
}

export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: { username: string }
}

export interface User {
  id: number
  username: string
  image: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: { address: string; city: string; state: string }
  company: { name: string; title: string }
}

export interface Tag {
  slug: string
  url: string
}

export interface URLParams {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedTag: string
}
