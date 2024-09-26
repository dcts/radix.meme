import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type TProps = {
  href: string;
  icon?: React.ReactNode;
  text: string;
  className?: string;
};

export const LinkCta = ({ href, icon, text, className }: TProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex items-center gap-x-2
          px-4 py-2
          max-sm:text-sm sm:text-base
          max-sm:h-9 sm:h-11
          border border-b-4
          font-[family-name:var(--font-josefin-sans)] 
          font-bold
          text-dexter-grey-light
          bg-dexter-green 
          border-dexter-green-faded  
          rounded-lg
          shadow-[0px_4px_40px_2px_#CBEF63]
        `,
        className
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

export const LinkPrimary = ({ href, icon, text, className }: TProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex items-center gap-x-2
          px-4 py-2
          max-sm:text-sm sm:text-base
          max-sm:h-9 sm:h-11
          border border-b-4
          font-[family-name:var(--font-josefin-sans)] 
          font-bold
          text-dexter-grey-light
          bg-dexter-green 
          border-dexter-green-faded  
          rounded-lg
        `,
        className
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

export const LinkSecondary = ({ href, icon, text, className }: TProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex items-center gap-x-2
          px-4 py-2
          max-sm:text-sm sm:text-base
          max-sm:h-9 sm:h-11
          border border-b-4
          font-[family-name:var(--font-josefin-sans)] 
          font-bold
          bg-dexter-grey-dark 
          border-white
          rounded-lg
        `,
        className
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
};
