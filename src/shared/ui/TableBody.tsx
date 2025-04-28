import { forwardRefWithType } from "../../types"

export const TableBody = forwardRefWithType<"tbody">(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))
