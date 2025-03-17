import apiRequest from '../../utils/apiRequest'
import { useQuery } from '@tanstack/react-query'
import { CommentType } from '../../utils/interface'
import Comment from './Comment'
import './comments.css'
import CommentForm from './CommentForm'

const fetchComments = async (pin: string) => {
  const response = await apiRequest.get(`/comments/${pin}`)
  return response.data
}

interface CommentsProps {
  pinId: string
}

const Comments: React.FC<CommentsProps> = ({ pinId }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['comments', pinId],
    queryFn: () => fetchComments(pinId),
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return `Error: ${error}`
  console.log('data', data)

  if (!data) return <div>Comments not found</div>

  return (
    <div className="comments">
      <div className="commentList">
        <span className="commenCount">
          {data.length === 0 ? 'No ' : data.length} Comments
        </span>
        {data.map((comment: CommentType) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
      <CommentForm pinId={pinId} />
    </div>
  )
}

export default Comments
