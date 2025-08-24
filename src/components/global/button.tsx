"use client";

import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { Button as ShadButton } from "@/components/ui/button";
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
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
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
      type = "button",
      ...props
    },
    ref
  ) => {
    const showStartIcon = IconStart && (!iconOnly || !IconEnd);
    const showEndIcon = IconEnd && (!iconOnly || !IconStart);

    return (
      <ShadButton
        ref={ref}
        className={cn(
          "cursor-pointer inline-flex items-center justify-center rounded-md font-normal tracking-wide shadow-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          loading ? "select-none" : ""
        )}
        disabled={loading || disabled}
        type={type}
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
  }
);

Button.displayName = "Button";
export default Button;
