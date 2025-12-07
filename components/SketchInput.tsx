import React from "react";

interface SketchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const SketchInput: React.FC<SketchInputProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-bold text-2xl sketch-font flex items-center gap-2 text-black">
          <span className="w-3 h-3 border-2 border-black bg-black inline-block rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]"></span>
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-4 
          bg-white 
          border-2 border-black 
          text-black 
          placeholder-gray-500
          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] 
          focus:outline-none 
          focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] 
          focus:-translate-y-1 focus:-translate-x-1
          transition-all duration-200
          font-mono text-lg
          sketch-border-sm
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
