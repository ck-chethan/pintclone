import { Request, Response } from 'express'
import Comment from '../models/comment.model.ts'

export const getPinComments = async (req: Request, res: Response) => {
  const { pinId } = req.params
  const comments = await Comment.find({ pin: pinId })
    .populate('user', 'username img displayName')
    .sort({ createdAt: -1 })
  res.status(200).json(comments)
}

export const addCommment = async (req: Request, res: Response) => {
  const { description, pin } = req.body
  if (!description || !pin) {
    res.status(400).json({ message: 'All fields are required' })
  }
  console.log(req.userId)

  const newComment = new Comment({
    description,
    user: req.userId,
    pin,
  })
  try {
    const savedComment = await newComment
      .save()
      .then((comment) => comment.populate('user', 'username img displayName'))

    res.status(201).json(savedComment)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
