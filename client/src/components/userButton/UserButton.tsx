import React, { useState } from 'react'
import './userButton.css'
const UserButton: React.FC = () => {
  const [enableUserOptions, setEnableUserOptions] = useState(false)
  const currentUser = true
  return currentUser ? (
    <div className="userButton">
      <img src="/general/noAvatar.png" alt="" />
      <img
        className="arrow"
        src="/general/arrow.svg"
        alt=""
        onClick={() => setEnableUserOptions((prev) => !prev)}
      />
      {enableUserOptions && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Setting</div>
          <div className="userOption">Logout</div>
        </div>
      )}
    </div>
  ) : (
    <a href="/" className="loginLink">
      Login / Singup
    </a>
  )
}

export default UserButton
