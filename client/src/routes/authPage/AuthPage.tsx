import React, { useState } from 'react'
import './authPage.css'
import Image from '../../components/image/Image'
import apiRequest from '../../utils/apiRequest'
import { useNavigate } from 'react-router'
import useAuthStore from '../../utils/authStore'

const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { setCurrentUser } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log('Form Data', data)

    const url = isRegister ? '/users/auth/register' : '/users/auth/login'
    try {
      const response = await apiRequest.post(url, data)
      setCurrentUser(response.data.user)
      setError('')
      navigate('/')
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path={'/general/logo.png'} alt="logo" w="36" h="36" />
        <h1>{isRegister ? 'Create an Account' : 'Login to your account'}</h1>
        {isRegister ? (
          <form key="register" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                placeholder="Username"
                required
                name="username"
                id="username"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="displayName"
                placeholder="Name"
                required
                name="displayName"
                id="displayName"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsRegister(false)}>
              {'Already have an account? '}
              <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="login" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              {"Don't have an account? "}
              <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthPage
