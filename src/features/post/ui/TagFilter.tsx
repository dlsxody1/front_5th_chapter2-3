import { useAtom } from "jotai"

import { selectedTagAtom } from "../model/atoms"
import { Select, SelectValue } from "@radix-ui/react-select"
import { SelectItem, SelectTrigger } from "../../../shared"
import { SelectContent } from "../../../shared/ui/SelectCotent"
import { useTagsQuery } from "../model/hooks/useTagsQuery"

const TagFilter = () => {
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const { data: tags, isLoading: isTagsLoading } = useTagsQuery()
  return (
    <Select value={selectedTag} onValueChange={setSelectedTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {!isTagsLoading &&
          tags?.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}

export default TagFilter
