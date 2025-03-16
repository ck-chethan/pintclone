import React, { useState } from 'react'
import './userButton.css'
import Image from '../image/Image'
const UserButton: React.FC = () => {
  const [enableUserOptions, setEnableUserOptions] = useState(false)
  const currentUser = true
  return currentUser ? (
    <div className="userButton">
      <Image path="/general/noAvatar.png" alt="" />
      <Image
        className="arrow"
        path="/general/arrow.svg"
        alt="arrow"
        onClickHandler={() => setEnableUserOptions((prev) => !prev)}
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
