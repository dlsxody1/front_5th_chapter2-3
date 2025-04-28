import { forwardRefWithType } from "../../types"

export const Card = forwardRefWithType<"div">(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
))
Card.displayName = "Card"
