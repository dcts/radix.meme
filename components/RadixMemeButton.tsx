"use client";

import React, { ElementType } from "react";
import { cn } from "@/lib/utils";

// type accepting props for a button, a Link or a span
type AsProps<T extends ElementType> = {
  as?: T;
  icon?: React.ReactNode;
  text: string;
  variant?: "primary" | "secondary" | "cta" | "warning";
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const sharedClasses = `
  flex items-center justify-center gap-x-2
  px-4 py-2
  max-sm:text-sm sm:text-base
  max-sm:h-9 sm:h-11
  border border-b-4
  font-[family-name:var(--font-josefin-sans)] 
  font-bold
  rounded-lg
  transition duration-300 transition-all
`;

const extraClasses = {
  primary: `
    text-dexter-grey-light
    bg-dexter-green 
    border-dexter-green-faded
    hover:bg-dexter-gradient-green
    `,
  secondary: `
    bg-dexter-grey-dark 
    border-white`,
  cta: `
    text-dexter-grey-light
    bg-dexter-green 
    border-dexter-green-faded  
    shadow-[0px_4px_40px_2px_#CBEF63]`,
  warning: `
    bg-dexter-red-b 
    hover:bg-dexter-red-c 
    text-white`,
};

function RadixMemeButton<T extends ElementType = "button">({
  as,
  icon,
  text,
  variant = "primary", // default to primary
  className = "",
  ...rest
}: AsProps<T>) {
  const As = as || "button"; // default to "button"

  return (
    <As
      className={cn(sharedClasses, extraClasses[variant], className)}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </As>
  );
}

export default RadixMemeButton;
