import { forwardRefWithType } from "../../types"

export const CardContent = forwardRefWithType<"div">(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"
