import { useAtom } from "jotai"
import { limitAtom, skipAtom } from "../model/atoms"
import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { SelectContent } from "../../../shared/ui/SelectCotent"
import { Button, SelectItem } from "../../../shared"

export const Pagination = ({ total }: { total: number }) => {
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)

  const handlePrevious = () => {
    setSkip(Math.max(0, skip - limit))
  }

  const handleNext = () => {
    setSkip(skip + limit)
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value: string) => setLimit(Number(value))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handlePrevious}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
