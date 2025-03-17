import express, { Request, Response } from 'express'
import Pin from '../models/pin.model.ts'

export const getPins = async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.cursor) || 0
  const search = req.query.search || ''
  const userId = req.query.userId || ''

  const limit = Number(req.query.limit) || 21
  const pins = await Pin.find(
    search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $in: search } },
          ],
        }
      : userId
      ? {
          user: userId,
        }
      : {}
  )
    .limit(limit)
    .skip(pageNumber * limit)

  const hasNextPage = pins.length === limit
  res
    .status(200)
    .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null })
}

export const getPin = async (req: Request, res: Response) => {
  const pin = await Pin.findById(req.params.id).populate(
    'user',
    'username img displayName'
  )
  res.status(200).json(pin)
}
