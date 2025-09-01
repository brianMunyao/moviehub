"use client";

import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "password" | "email" | "tel" | "file" | "number" | "color";
  min?: number;
  isRequired?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

const ControlledAppInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  min,
  isRequired,
  disabled,
  readOnly,
  className,
  ...otherProps
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel htmlFor={name}>
              {label}
              {isRequired ? "*" : ""}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative">
              <Input
                id={name}
                readOnly={readOnly}
                disabled={disabled}
                placeholder={placeholder}
                type={isPassword && showPassword ? "text" : type}
                {...(type === "number" && min !== undefined ? { min } : {})}
                className={cn(
                  "shadow-none placeholder:text-sm placeholder:text-dark pr-10", // extra right padding for the icon
                  fieldState.error && "border-error focus-visible:ring-error",
                  className
                )}
                {...field}
                {...otherProps}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledAppInput;
