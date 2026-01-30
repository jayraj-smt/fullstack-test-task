import React from 'react'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth'

export default function Topbar({ setSidebarOpen }) {
  const { user, logout } = useAuth()

  return (
    <header className='bg-white shadow px-4 py-3 flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className='p-2 rounded-md hover:bg-gray-100'
        >
          <FiMenu className='w-6 h-6 text-gray-700' />
        </button>
        <div>
          <h1 className='text-lg font-semibold text-slate-800'>
            TMS Dashboard
          </h1>
          <div className='text-xs text-gray-500'>
            Manage shipments & reports
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <div className='text-right'>
          <div className='text-sm font-medium text-slate-700'>
            {user?.email}
          </div>
          <div className='text-xs text-gray-500'>{user?.role}</div>
        </div>
        <button
          onClick={logout}
          className='btn btn-ghost rounded-md flex items-center gap-2'
        >
          <FiLogOut />
          <span className='text-sm text-slate-700'>Logout</span>
        </button>
      </div>
    </header>
  )
}
