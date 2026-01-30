import React from 'react'
import { useToast } from '../hooks/useToast'

export default function Toasts() {
  const { toasts, remove } = useToast()

  return (
    <div className='fixed right-4 bottom-4 flex flex-col gap-2 z-50'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-3 rounded shadow flex items-center gap-2 ${t.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-white text-slate-800'}`}
        >
          <div className='text-sm'>{t.message}</div>
          <button
            onClick={() => remove(t.id)}
            className='ml-2 text-xs text-gray-500'
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}
