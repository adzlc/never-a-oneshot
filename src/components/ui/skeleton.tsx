import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  console.log("Showing skeleton")
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary", className)}
      {...props}
    />
  )
}

export { Skeleton }
