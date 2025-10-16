import React from 'react'
import clsx from 'clsx'

export default function Pill({ children, color = 'slate', className, ...props }) {
  const colorMap = {
    slate: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  }
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', colorMap[color], className)} {...props}>
      {children}
    </span>
  )
}
