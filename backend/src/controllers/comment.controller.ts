import express, { Request, Response } from 'express'

export const getComments = (req: Request, res: Response) => {
  res.json({ message: 'User Controller' })
}
