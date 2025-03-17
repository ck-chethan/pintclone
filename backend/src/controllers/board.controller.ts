import express, { Request, Response } from 'express'
import Board from '../models/board.model.ts'
import Pin from '../models/pin.model.ts'

export const getUserBoards = async (req: Request, res: Response) => {
  const boards = await Board.find({ user: req.params.userId })
  const boardsWithPins = await Promise.all(
    boards.map(async (board) => {
      const pinCount = await Pin.countDocuments({ board: board._id })
      const firstPin = await Pin.findOne({ board: board._id })
      return {
        ...board.toObject(),
        pinCount,
        firstPin,
      }
    })
  )
  res.status(200).json(boardsWithPins)
}
