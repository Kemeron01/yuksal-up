import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * shadcn/ui Button themed with the YuksalUp design: 44px pill, 13px semibold label.
 * Variants map to the Figma button styles (Primary, Secondary, Outline, Accent, nav Soft / Active).
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-[family-name:var(--font-body)] text-[13px] leading-[19px] font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-navy disabled:pointer-events-none disabled:bg-gray disabled:text-navy [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-navy text-white hover:bg-navy-hover",
        secondary: "bg-secondary text-navy hover:bg-gray",
        outline: "border-border bg-paper text-navy hover:bg-blue disabled:border-[var(--line)]",
        accent: "bg-yellow text-navy hover:bg-soft-yellow",
        soft: "bg-wash text-navy hover:bg-[#d9e3f7]",
        active: "bg-navy text-white hover:bg-navy-hover",
        ghost: "text-navy hover:bg-muted",
        destructive: "bg-negative-bg text-negative hover:bg-negative/15",
        link: "h-auto rounded-none px-0 text-navy underline underline-offset-4 hover:decoration-2",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-12 px-6",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props &
  Omit<VariantProps<typeof buttonVariants>, "variant"> & {
    /** `unstyled` keeps only the passed className (icon buttons, menu items, chips styled by CSS Modules). */
    variant?: VariantProps<typeof buttonVariants>["variant"] | "unstyled"
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={
        variant === "unstyled"
          ? (className as string | undefined)
          : cn(buttonVariants({ variant, size, className }))
      }
      {...props}
    />
  )
}

export { Button, buttonVariants }
