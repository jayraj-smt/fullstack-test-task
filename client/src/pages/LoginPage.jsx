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
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Sign in</h2>
      <form onSubmit={submit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full p-2 border rounded'
          />
        </div>
        {error && <div className='text-red-600'>Authentication failed</div>}
        <button
          disabled={loading}
          className='w-full bg-indigo-600 text-white py-2 rounded'
        >
          {loading ? 'Signing...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
