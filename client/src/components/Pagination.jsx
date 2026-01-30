import React from 'react'

export default function Pagination({ page, pages, onChange }) {
  return (
    <div className='flex items-center gap-2'>
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className='btn btn-ghost px-3 py-1 disabled:opacity-50'
      >
        Prev
      </button>
      <div className='px-3 py-1 text-sm text-gray-600'>
        {page} / {pages}
      </div>
      <button
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className='btn btn-ghost px-3 py-1 disabled:opacity-50'
      >
        Next
      </button>
    </div>
  )
}
