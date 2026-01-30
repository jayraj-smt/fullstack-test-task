import React from 'react'

export default function ConfirmModal({
  title = 'Confirm',
  message = '',
  onCancel,
  onConfirm,
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black opacity-30'
        onClick={onCancel}
      />
      <div className='bg-white rounded-lg shadow-card p-6 w-full max-w-md z-10 text-left'>
        <h3 className='text-lg font-semibold mb-4'>{title}</h3>
        <p className='mb-4 text-sm text-gray-600'>{message}</p>
        <div className='flex justify-end gap-2'>
          <button onClick={onCancel} className='btn btn-ghost'>
            Cancel
          </button>
          <button onClick={onConfirm} className='btn btn-primary bg-red-600'>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
