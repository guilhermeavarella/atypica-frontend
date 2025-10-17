import React from 'react'

export default function Button({ text, onClick }) {
  return (
    <button className="h-[2.25rem] py-[0.75rem] px-[2rem] bg-brand-primary rounded-3xl inline-flex justify-center items-center gap-1" onClick={onClick}>
      <div className="text-center justify-center text-content-inverse text-sm font-semibold font-poppins">{text}</div>
    </button>
  )
}