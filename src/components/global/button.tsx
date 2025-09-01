"use client";

import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { Button as ShadButton } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { IconType } from "@/types/IconType";

type CustomButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  IconStart?: IconType;
  IconEnd?: IconType;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | null
    | undefined;
  iconOnly?: boolean;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null;
}>;

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      loading,
      disabled,
      children,
      IconStart,
      IconEnd,
      iconOnly,
      tooltip,
      type = "button",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const showStartIcon = IconStart && (!iconOnly || !IconEnd);
    const showEndIcon = IconEnd && (!iconOnly || !IconStart);

    const button = (
      <ShadButton
        ref={ref}
        className={cn(
          "cursor-pointer inline-flex items-center justify-center rounded-md font-normal tracking-wide shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          variant === "outline" ? "bg-transparent border border-white" : "",
          loading ? "select-none" : ""
        )}
        disabled={loading || disabled}
        type={type}
        variant={variant}
        {...props}
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" />
            {children}
          </>
        ) : (
          <>
            {showStartIcon && <IconStart className={cn(iconOnly ? "" : "mr-1")} />}
            {!iconOnly && children && <span>{children}</span>}
            {showEndIcon && <IconEnd className={cn(iconOnly ? "" : "mr-1")} />}
          </>
        )}
      </ShadButton>
    );

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  }
);

Button.displayName = "Button";
export default Button;
