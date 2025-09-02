"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type IOption =
  | {
      label: string;
      value: string;
      disabled?: boolean;
    }
  | {
      label: string;
      options: { label: string; value: string; disabled?: boolean }[];
    };

type Props = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: IOption[];
  className?: string;
};

const AppSelect = ({
  label,
  value,
  onChange,
  placeholder = "Select...",
  options,
  className,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      )}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-full", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt, idx) =>
            "options" in opt ? (
              <SelectGroup key={idx}>
                <SelectLabel>{opt.label}</SelectLabel>
                {opt.options.map((subOpt) => (
                  <SelectItem key={subOpt.value} value={subOpt.value} disabled={subOpt.disabled}>
                    {subOpt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ) : (
              <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppSelect;
