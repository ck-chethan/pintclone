import { Request, Response } from 'express'
import User from '../models/user.model.ts'
import bcrypt from 'bcryptjs'

export const createUser = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  await User.create({
    ...req.body,
    hashedPassword: hashedPassword,
  })

  res.json({ message: 'User created successfully' })
}

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username }).select(
    '-hashedPassword'
  )
  if (!user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    console.log(user)
    res.status(200).json(user)
  }
}
