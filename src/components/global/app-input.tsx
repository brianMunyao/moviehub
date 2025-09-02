"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
};

const AppInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    const generatedId = React.useId();
    const id = props.id ?? generatedId;

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
        )}

        <Input
          ref={ref}
          id={id}
          className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
          {...props}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
