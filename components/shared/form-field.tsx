import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function FormField({
  id,
  label,
  error,
  hint,
  required = false,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-destructive ml-0.5">*</span> : null}
      </Label>
      {children}
      {hint && !error ? (
        <p className="text-muted-foreground text-xs leading-relaxed">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-destructive text-xs leading-relaxed" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
