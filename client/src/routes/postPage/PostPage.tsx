import { Link, useParams } from 'react-router'
import Image from '../../components/image/Image'
import PostInteractions from '../../components/postInteractions/PostInteractions'
import './postPage.css'
import Comments from '../../components/comments/Comments'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'

const fetchPin = async (id: string) => {
  const response = await apiRequest(`/pins/${id}`)
  return response.data
}

const PostPage: React.FC = () => {
  const { id = '' } = useParams()
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['pin', id],
    queryFn: () => fetchPin(id),
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return `Error: ${error}`
  if (!data) return <div>Pin not found</div>

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
          <Image src={data.media} alt="Post" w={'736'} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to={`/${data.user.username}`} className="postUser">
            <Image
              src={data.user.img || '/general/noAvatar.png'}
              alt="Avatar"
            />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments pinId={id} />
        </div>
      </div>
    </div>
  )
}

export default PostPage
