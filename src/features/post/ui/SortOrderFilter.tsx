import { useAtom } from "jotai"
import { sortOrderAtom } from "../model/atoms"
import { Select, SelectValue } from "@radix-ui/react-select"
import { SelectItem, SelectTrigger } from "../../../shared"
import { SelectContent } from "../../../shared/ui/SelectCotent"
const SortOrderFilter = () => {
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortOrderFilter
