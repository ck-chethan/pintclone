import Image from '../image/Image'
import './postInteractions.css'
const PostInteractions = () => {
  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <Image path="/general/react.svg" alt="React" />
        273
        <Image path="/general/share.svg" alt="Share" />
        <Image path="/general/more.svg" alt="more" />
      </div>
      <button>Save</button>
    </div>
  )
}

export default PostInteractions
