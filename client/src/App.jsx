import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './components/Topbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import ShipmentsPage from './pages/ShipmentsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { AuthProvider, useAuth } from './hooks/useAuth'

function AuthContent({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth()

  // When not authenticated, show only login screen (centered)
  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <main className='p-6 w-full max-w-md'>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='/login' replace />} />
          </Routes>
        </main>
      </div>
    )
  }

  // Authenticated layout
  return (
    <div className='min-h-screen flex bg-gray-50'>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className='flex-1 flex flex-col'>
        <Topbar setSidebarOpen={setSidebarOpen} />
        <main className='p-6'>
          <Routes>
            <Route
              path='/login'
              element={<Navigate to='/shipments' replace />}
            />
            <Route path='/shipments' element={<ShipmentsPage />} />
            <Route path='/' element={<Navigate to='/shipments' replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <AuthContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </AuthProvider>
  )
}
