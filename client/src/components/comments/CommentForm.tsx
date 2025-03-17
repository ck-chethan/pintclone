import EmojiPicker from 'emoji-picker-react'
import { ChangeEvent, useState } from 'react'
import apiRequest from '../../utils/apiRequest'
import { i } from 'react-router/dist/development/fog-of-war-CvttGpNz'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CommentType } from '../../utils/interface'

interface CommentFormProps {
  pinId: string
}

const addCommment = async (comment: CommentType) => {
  const response = await apiRequest.post('/comments', comment)
  return response.data
}

const CommentForm: React.FC<CommentFormProps> = ({ pinId }) => {
  const [enableEmojiPicker, setEnableEmojiPicker] = useState<boolean>(false)
  const [desc, setDesc] = useState('')

  const handleEmojiClick = (emojiObject: any) => {
    setDesc((prev) => prev + emojiObject.emoji)
    setEnableEmojiPicker(false)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addCommment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', pinId] })
      setDesc('')
      setEnableEmojiPicker(false)
    },
  })

  const handleCommentSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({ description: desc, pin: pinId })
  }

  return (
    <form className="commentForm" onSubmit={handleCommentSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="emoji">
        <div onClick={() => setEnableEmojiPicker((prev) => !prev)}>😀</div>
        {enableEmojiPicker && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  )
}

export default CommentForm
