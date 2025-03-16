import React, { useState } from 'react'
import Image from '../../components/image/Image'
import './profilePage.css'
import { ProfileOption } from '../../utils/enum'
import Gallery from '../../components/gallery/Gallery'
import Collections from '../../components/collections/Collections'

const ProfilePage: React.FC = () => {
  const [profileOptionSelected, setProfileOptionSelected] =
    useState<ProfileOption>(ProfileOption.SAVED)
  return (
    <div className="profilePage">
      <Image
        className="profileImg"
        path="general/noAvatar.png"
        alt="Profile"
        w="100"
        h="100"
      />
      <h1 className="profileName">John Doe</h1>
      <span className="profileUsername">@johndoe</span>
      <div className="followCount">10 followers - 20 followings</div>
      <div className="profileInteractions">
        <Image path="general/share.svg" alt="Share" />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <Image path="general/more.svg" alt="More" />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setProfileOptionSelected(ProfileOption.CREATED)}
          className={
            profileOptionSelected === ProfileOption.CREATED ? 'active' : ''
          }
        >
          Created
        </span>
        <span
          onClick={() => setProfileOptionSelected(ProfileOption.SAVED)}
          className={
            profileOptionSelected === ProfileOption.SAVED ? 'active' : ''
          }
        >
          Saved
        </span>
      </div>
      {profileOptionSelected === ProfileOption.CREATED ? (
        <Gallery />
      ) : (
        <Collections />
      )}
    </div>
  )
}

export default ProfilePage
