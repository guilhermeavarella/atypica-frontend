import React from 'react'

export default function Button({ text, onClick, icon }) {
  return (
    <button className="self-stretch p-3 bg-white rounded-2xl outline outline-1 outline-content-light inline-flex justify-start items-center gap-2 overflow-hidden" onClick={onClick}>
      <img src={icon} className="w-6 h-6" />
      <div className="justify-start text-content-primary text-sm font-normal font-general">{text}</div>
    </button>
  )
}