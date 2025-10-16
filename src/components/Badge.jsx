import React from 'react'
import clsx from 'clsx'

export default function Badge({ level = 'green', label }) {
  const colors = {
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    yellow: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  }
  return (
    <span className={clsx('px-2 py-0.5 rounded text-xs font-semibold', colors[level])}>
      {label || level}
    </span>
  )
}
