import React, { useState } from 'react'
import './userButton.css'
import Image from '../image/Image'
import apiRequest from '../../utils/apiRequest'
import { Link, useNavigate } from 'react-router'
import useAuthStore from '../../utils/authStore'

const UserButton: React.FC = () => {
  const [enableUserOptions, setEnableUserOptions] = useState(false)
  const navigate = useNavigate()
  const { currentUser, removeCurrentUser } = useAuthStore()
  console.log('currentUser', currentUser)

  const logoutHandler = async () => {
    try {
      const resp = await apiRequest.post('/users/auth/logout', {})
      if (resp.status === 200) {
        removeCurrentUser()
        navigate('/auth')
      }
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }
  return currentUser ? (
    <div className="userButton">
      <Image path={'/general/noAvatar.png'} alt="" />
      <div className="" onClick={() => setEnableUserOptions((prev) => !prev)}>
        <Image className="arrow" path="/general/arrow.svg" alt="arrow" />
      </div>
      {enableUserOptions && (
        <div className="userOptions">
          <Link to={`/profile/${currentUser.username}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Setting</div>
          <div className="userOption" onClick={logoutHandler}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login / Singup
    </Link>
  )
}

export default UserButton
