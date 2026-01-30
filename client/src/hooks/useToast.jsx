import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(
    (message, { type = 'info', ttl = 4000 } = {}) => {
      const id = Date.now().toString()
      setToasts((t) => [...t, { id, message, type }])
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), ttl)
    },
    [],
  )

  const remove = useCallback(
    (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast, toasts, remove }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
