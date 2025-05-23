import { forwardRefWithType } from "../../types"

export const TableCell = forwardRefWithType<"td">(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))
