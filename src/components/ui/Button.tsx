import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

export function Button({ variant = "primary", icon, children, className, ...rest }: ButtonProps) {
  return (
    <button className={classNames(variantClass[variant], className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
