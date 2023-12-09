"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      placeholder,
      type,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            defaultValue={defaultValue}
            required={required}
            onBlur={onBlur}
            placeholder={placeholder}
            name={id}
            ref={ref}
            id={id}
            type={type}
            disabled={disabled || pending}
            className={cn("text-sm h-7 px-2 py-1", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        {errors && (
          <div
            className="mt-2 text-xs text-red-500"
            id={`${id}-error`}
            aria-live="polite"
          >
            {errors?.[id]?.map((error: string) => (
              <p
                key={error}
                className="flex items-center font-medium p-2 border border-red-500 bg-rose-500/10 rounded-sm"
              >
                <XCircle className="h-4 w-4 mr-2" />
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
export default FormInput;
