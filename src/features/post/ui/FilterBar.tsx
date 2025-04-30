import { useAtom } from "jotai"
import { searchQueryAtom } from "../model/atoms"
import { Input } from "../../../shared"
import { Search } from "lucide-react"
import { useDebounce } from "../../../shared/lib/useDebounce"
import { useEffect, useState } from "react"
import TagFilter from "./TagFilter"
import SortFilter from "./SortFilter"
import SortOrderFilter from "./SortOrderFilter"

export const FilterBar = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  const [inputValue, setInputValue] = useState(searchQuery)
  const debouncedValue = useDebounce(inputValue, 400)

  useEffect(() => {
    setSearchQuery(debouncedValue)
  }, [debouncedValue, setSearchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value
      console.log(value, "value")
      setInputValue(value)
      setSearchQuery(value)
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <TagFilter />
      <SortFilter />
      <SortOrderFilter />
    </div>
  )
}
