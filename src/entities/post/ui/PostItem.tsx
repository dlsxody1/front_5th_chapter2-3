import { useAtomValue, useSetAtom } from "jotai"
import {
  searchQueryAtom,
  selectedPostAtom,
  selectedTagAtom,
  selectedUserIdAtom,
  showEditDialogAtom,
  showPostDetailDialogAtom,
  showUserModalAtom,
} from "../../../features/post/model/atoms"

import { Button, TableCell, TableRow } from "../../../shared"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { highlightText } from "../../../shared/lib/highlightText"
import { Post } from "../model/types"
import { useDeletePostQuery } from "../../../features/post/model/hooks/useDeletePostQuery"

export const PostItem = ({ post }: { post: Post }) => {
  const searchQuery = useAtomValue(searchQueryAtom)
  const selectedTag = useAtomValue(selectedTagAtom)
  const setSelectedPost = useSetAtom(selectedPostAtom)
  const setShowEditDialog = useSetAtom(showEditDialogAtom)
  const setShowPostDetailDialog = useSetAtom(showPostDetailDialogAtom)
  const setSelectedTag = useSetAtom(selectedTagAtom)
  const setSelectedUserId = useSetAtom(selectedUserIdAtom)
  const setShowUserModal = useSetAtom(showUserModalAtom)
  const { mutate } = useDeletePostQuery()

  const handleEditClick = () => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleDetailClick = () => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleDeleteClick = () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      mutate(post.id)
    }
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  const handleUserClick = () => {
    if (post.author) {
      setSelectedUserId(post.author.id)
      setShowUserModal(true)
    }
  }

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleUserClick}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleDetailClick}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleEditClick}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDeleteClick}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
