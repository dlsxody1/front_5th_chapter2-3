import { forwardRefWithType } from "../../types";

export const TableHeader = forwardRefWithType<"thead">(({ className, ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
  ))