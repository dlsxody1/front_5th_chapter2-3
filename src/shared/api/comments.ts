export const fetchComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return response.json()
}

export const addComment = async (comment: { body: string; postId: number; userId: number }) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  return response.json()
}

export const updateComment = async (id: number, body: string) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  return response.json()
}

export const deleteComment = async (id: number) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

export const likeComment = async (id: number, likes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  return response.json()
}
