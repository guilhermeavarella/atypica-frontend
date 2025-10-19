import React from 'react'

export default function Button({ variant, text, onClick}) {
  const baseStyles = "min-h-[2.25rem] py-[0.5rem] rounded-3xl inline-flex justify-center items-center gap-1 font-semibold";
  const variantStyles = {
    primary: "bg-brand-primary text-content-inverse px-[2rem] hover:bg-brand-primary-light",
    secondary: "bg-0 px-1 hover:font-bold",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      <div className="text-center justify-center text-sm font-poppins">{text}</div>
    </button>
  )
}