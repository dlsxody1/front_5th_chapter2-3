import React from "react"
import { PostItem } from "../../../entities/post/ui/PostItem"
import { usePostsQuery } from "../model/hooks/usePostQuery"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared"
import { Pagination } from "./Pagination"

export const PostsTable: React.FC = () => {
  const { posts, total, isLoading } = usePostsQuery()

  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성자</TableHead>
            <TableHead className="w-[150px]">반응</TableHead>
            <TableHead className="w-[150px]">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </TableBody>
      </Table>
      {posts && <Pagination total={total} />}
    </>
  )
}
