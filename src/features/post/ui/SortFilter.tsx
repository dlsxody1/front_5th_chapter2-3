import { Select, SelectValue } from "@radix-ui/react-select"
import { SelectItem, SelectTrigger } from "../../../shared"
import { SelectContent } from "../../../shared/ui/SelectCotent"
import { sortByAtom } from "../model/atoms"
import { useAtom } from "jotai"

const SortFilter = () => {
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">없음</SelectItem>
        <SelectItem value="id">ID</SelectItem>
        <SelectItem value="title">제목</SelectItem>
        <SelectItem value="reactions">반응</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SortFilter
