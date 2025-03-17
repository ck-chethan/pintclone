import { Request, Response } from 'express'
import Comment from '../models/comment.model.ts'

export const getPinComments = async (req: Request, res: Response) => {
  const { pinId } = req.params
  const comments = await Comment.find({ pin: pinId })
    .populate('user', 'username img displayName')
    .sort({ createdAt: -1 })
  res.status(200).json(comments)
}
