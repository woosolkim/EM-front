import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const TEXT_SIZE = {
  "10_regular_120%": "text-[10px] font-normal leading-[1.2]",
  "10_bold_120%": "text-[10px] font-bold leading-[1.2]",

  "12_regular": "text-[12px] font-normal leading-[1.4]",
  "12_medium": "text-[12px] font-medium leading-[1.4] ",
  "12_semibold": "text-[12px] font-semibold leading-[1.4]",
  "12_bold": "text-[12px] font-bold leading-[1.4]",

  "13_regular": "text-[13px] font-normal leading-[1.4] ",
  "13_medium": "text-[13px] font-medium leading-[1.4] ",
  "13_bold": "text-[13px] font-bold leading-[1.4]",
  "13_semibold": "text-[13px] font-semibold leading-[1.4] ",
  "13_regular_underline": "text-[13px] font-normal leading-[1.4] underline",

  "14_regular": "text-[14px] font-regular leading-[1.4] ",
  "14_medium": "text-[14px] font-medium leading-[1.4] ",
  "14_semibold": "text-[14px] font-semibold leading-[1.4] ",
  "14_bold": "text-[14px] font-bold leading-[1.4] ",

  "15_regular": "text-[15px] font-normal leading-[1.4] ",
  "15_medium": "text-[15px] font-medium leading-[1.4] ",
  "15_bold": "text-[15px] font-bold leading-[1.4] ",
  "15_semibold": "text-[15px] font-semibold leading-[1.4] ",

  "16_regular": "text-[16px] font-normal leading-[1.4] ",
  "16_medium": "text-[16px] font-medium leading-[1.4] ",
  "16_semibold": "text-[16px] font-semibold leading-[1.4] ",
  "16_bold": "text-[16px] font-bold leading-[1.4] ",

  "17_regular": "text-[17px] font-normal leading-[1.4] ",
  "17_medium": "text-[17px] font-medium leading-[1.4] ",
  "17_semibold": "text-[17px] font-semibold leading-[1.4] ",
  "17_bold": "text-[17px] font-bold leading-[1.4] ",

  "24_semibold_130%": "text-[24px] font-semibold leading-[1.3]",
  "28_bold_130%": "text-[28px] font-bold leading-[1.3]",
};

export const TEXT_DEFAULT_VARIANTS = "12_medium";

const textVariants = cva("transition-colors", {
  variants: {
    size: TEXT_SIZE,
  },
  defaultVariants: {
    size: TEXT_DEFAULT_VARIANTS,
  },
});

type CombinedProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants>;

export interface TypographyProps extends CombinedProps {
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, size, as, ...props }, ref) => {
    const Comp = as || "p";

    return (
      <Comp
        className={cn(textVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
