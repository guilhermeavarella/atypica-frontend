import React from 'react'

export default function Button({ text, onClick, variant }) {
  const baseStyles = "min-h-[2.25rem] py-[0.75rem] rounded-3xl inline-flex justify-center items-center gap-1";
  const variantStyles = {
    primary: "bg-brand-primary text-content-inverse font-poppins px-[2rem]",
    secondary: "bg-0 font-general px-1",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      <div className="text-center justify-center text-sm font-semibold">{text}</div>
    </button>
  )
}