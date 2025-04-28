import * as DialogPrimitive from "@radix-ui/react-dialog"
import { forwardRefWithType } from "../../types"

export const DialogTitle = forwardRefWithType<"div">(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
