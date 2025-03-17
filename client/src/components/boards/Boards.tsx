import { Link, useParams } from 'react-router'
import Image from '../image/Image'
import './boards.css'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'
import { format } from 'timeago.js'
import { BoardType } from '../../utils/interface'

interface BoardsProps {
  userId?: string
}

const fetchBoard = async (userId: string) => {
  const response = await apiRequest(`/boards/${userId}`)
  return response.data
}

const Boards: React.FC<BoardsProps> = ({ userId }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['boards', userId],
    queryFn: () => fetchBoard(userId || ''),
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return `Error: ${error}`
  if (!data) return <div>Boards not found</div>

  return (
    <div className="collections">
      {data.map((board: BoardType) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image src={board.firstPin.media} alt="Board" />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins - {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Boards
