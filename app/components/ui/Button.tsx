import React from "react";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  children,
  onClick,
}: ButtonProps) {
  const baseStyle =
    "font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",

    // outline:
    //   "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100",
    // ghost:
    //   "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 py-2 text-sm rounded-md",
    lg: "h-12 px-6 py-3 text-base rounded-lg",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={` ${baseStyle} ${variants[variant]} ${sizes[size]}  `}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${baseStyle} ${variants[variant]} ${sizes[size]}  `}
    >
      {children}
    </button>
  );
}
