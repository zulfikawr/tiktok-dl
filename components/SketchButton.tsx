import React from "react";

interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export const SketchButton: React.FC<SketchButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  fullWidth = false,
  disabled,
  ...props
}) => {
  // Using sketch-border class for irregular shape
  const baseStyles =
    "sketch-font text-xl relative px-6 py-3 font-bold border-2 border-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sketch-border";

  const variants = {
    primary:
      "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    secondary:
      "bg-black text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] hover:bg-zinc-800 hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none",
    danger:
      "bg-red-500 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none",
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
