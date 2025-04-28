import { forwardRefWithType } from "../../types"

export const TableRow = forwardRefWithType<"tr">(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
))
