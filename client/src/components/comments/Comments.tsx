import { useState } from 'react'
import Image from '../image/Image'
import EmojiPicker from 'emoji-picker-react'
import './comments.css'

const Comments = () => {
  const [enableEmojiPicker, setEnableEmojiPicker] = useState<boolean>(false)
  return (
    <div className="comments">
      <div className="commentList">
        <span className="commenCount">5 Comments</span>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="Avatar" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">2h</span>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="Avatar" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">2h</span>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="Avatar" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">2h</span>
          </div>
        </div>
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="Avatar" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">2h</span>
          </div>
        </div>
      </div>
      <form className="commentForm" action="">
        <input type="text" placeholder="Add a comment" />
        <div className="emoji">
          <div onClick={() => setEnableEmojiPicker((prev) => !prev)}>😀</div>
          {enableEmojiPicker && (
            <div className="emojiPicker">
              <EmojiPicker />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Comments
