import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        role
      }
    }
  }
`

export default function LoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('adminpass')
  const [showPassword, setShowPassword] = useState(false)
  const [loginMutation, { loading, error }] = useMutation(LOGIN)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginMutation({ variables: { email, password } })
      login(data.login.user, data.login.token)
      navigate('/shipments')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100'>
      <h2 className='text-2xl font-semibold mb-2 text-slate-800'>Sign in</h2>
      <div className='text-sm text-gray-500 mb-4'>
        Welcome back — please sign in to continue.
      </div>
      <form onSubmit={submit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200'
            placeholder='you@company.com'
            inputMode='email'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='relative mt-1'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200'
              placeholder='••••••••'
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword((s) => !s)}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded text-gray-500 hover:bg-gray-100'
            >
              {showPassword ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.477-10-10 0-.66.064-1.304.183-1.93M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className='text-red-600 text-sm'>Authentication failed</div>
        )}

        <button disabled={loading} className='w-full btn btn-primary py-3'>
          {loading ? 'Signing...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
