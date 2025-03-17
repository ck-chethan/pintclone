import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import apiRequest from '../../utils/apiRequest'

interface FollowButtonProps {
  isFollowing: boolean
  username: string
}

const followUser = async (username: string) => {
  const response = await apiRequest.post(`/users/follow/${username}`, {})
  return response.data
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  username,
}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: followUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] })
    },
  })

  const onClickHandler = () => {
    mutation.mutate(username)
  }

  return (
    <button onClick={onClickHandler} disabled={mutation.isPending}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}

export default FollowButton
