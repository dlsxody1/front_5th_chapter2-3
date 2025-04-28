import { forwardRefWithType } from "../../types"

export const CardTitle = forwardRefWithType<"h3">(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"
