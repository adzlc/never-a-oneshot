import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "~/lib/utils";

const ringContentVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-base font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "ring-green-600/20 bg-green-50 text-green-700 ",
        neutral: "ring-blue-600/20 bg-blue-50 text-blue-700 ",
        enemy: "ring-red-600/20 bg-red-50 text-red-700 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface RingContentProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof ringContentVariants> {
  asChild?: boolean
}

const RingContent = React.forwardRef<HTMLParagraphElement, RingContentProps>(({ className, variant, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(ringContentVariants({ variant, className }))}
    {...props}
  />
))
export default RingContent;