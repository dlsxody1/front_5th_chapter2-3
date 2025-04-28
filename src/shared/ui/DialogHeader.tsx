interface Props {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const DialogHeader: React.FC<Props> = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ""}`} {...props} />
)

DialogHeader.displayName = "DialogHeader"
