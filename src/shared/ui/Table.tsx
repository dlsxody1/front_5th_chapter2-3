import { forwardRefWithType } from "../../types"

export const Table = forwardRefWithType<"table">(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
