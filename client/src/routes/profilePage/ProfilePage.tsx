import React, { useState } from 'react'
import Image from '../../components/image/Image'
import './profilePage.css'
import { ProfileOption } from '../../utils/enum'
import Gallery from '../../components/gallery/Gallery'
import apiRequest from '../../utils/apiRequest'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import Boards from '../../components/boards/Boards'
import FollowButton from './FollowButton'

const fetchUser = async (username: string) => {
  const response = await apiRequest(`/users/${username}`)
  return response.data
}

const ProfilePage: React.FC = () => {
  const [profileOptionSelected, setProfileOptionSelected] =
    useState<ProfileOption>(ProfileOption.SAVED)

  const { username = '' } = useParams()
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetchUser(username),
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return `Error: ${error}`
  if (!data) return <div>User not found</div>

  return (
    <div className="profilePage">
      <Image
        className="profileImg"
        src={data.img || 'general/noAvatar.png'}
        alt="Profile"
        w="100"
        h="100"
      />
      <h1 className="profileName">{data.user.displayName}</h1>
      <span className="profileUsername">@{data.user.username}</span>
      <div className="followCount">
        {data.followerCount} followers - {data.followingCount} followings
      </div>
      <div className="profileInteractions">
        <Image path="general/share.svg" alt="Share" />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.user.username}
          />
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
        <Gallery userId={data.user._id} />
      ) : (
        <Boards userId={data.user._id} />
      )}
    </div>
  )
}

export default ProfilePage
