import React from 'react'
import './comments.css'
import { CommentType } from '../../utils/interface'
import Image from '../image/Image'
import { format } from 'timeago.js'

interface CommentProps {
  comment: CommentType
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment" key={comment._id}>
      <Image src={comment.user.img || '/general/noAvatar.png'} alt="Avatar" />
      <div className="commentContent">
        <span className="commentUsername">{comment.user.displayName}</span>
        <p className="commentText">{comment.description}</p>
        <span className="commentTime">{format(comment.createdAt)}</span>
      </div>
    </div>
  )
}

export default Comment
