import { Link } from 'react-router'
import Image from '../../components/image/Image'
import PostInteractions from '../../components/postInteractions/PostInteractions'
import './postPage.css'
import Comments from '../../components/comments/Comments'

const PostPage: React.FC = () => {
  return (
    <div className="postPage">
      <svg
        aria-hidden="true"
        aria-label=""
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
      <div className="postContainer">
        <div className="postImage">
          <Image path={'/pins/pin1.jpeg'} alt="Post" w={'736'} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to="/john" className="postUser">
            <Image path="/general/noAvatar.png" alt="Avatar" />
            <span>John Doe</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  )
}

export default PostPage
