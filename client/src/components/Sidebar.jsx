import React from 'react'
import { Link } from 'react-router-dom'
import { FiTruck, FiBarChart2, FiSettings } from 'react-icons/fi'

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
      className={`bg-white border-r ${open ? 'w-64' : 'w-20'} transition-all h-screen`}
    >
      <div className='p-4 flex items-center gap-3 border-b'>
        <div className='w-8 h-8 rounded bg-brand-500 flex items-center justify-center text-white font-bold'>
          T
        </div>
        {open && <div className='font-bold text-lg'>TMS</div>}
      </div>
      <nav className='mt-4'>
        <Link
          to='/shipments'
          className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50'
        >
          <FiTruck className='w-5 h-5 text-gray-600' />
          {open && <span className='text-sm'>Shipments</span>}
        </Link>
        <a className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50'>
          <FiBarChart2 className='w-5 h-5 text-gray-600' />
          {open && <span className='text-sm'>Reports</span>}
        </a>
        <a className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50'>
          <FiSettings className='w-5 h-5 text-gray-600' />
          {open && <span className='text-sm'>Settings</span>}
        </a>
      </nav>
    </aside>
  )
}
