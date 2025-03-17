import { Request, Response } from 'express'
import User from '../models/user.model.ts'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username }).select(
    '-hashedPassword'
  )
  if (!user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    res.status(200).json(user)
  }
}

export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body)

  const { username, displayName, email, password } = req.body
  if (!username || !email || !password || !displayName) {
    res.status(400).json({ message: 'All fields are required' })
  }
  const newHashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    displayName,
    email,
    hashedPassword: newHashedPassword,
  })
  try {
    const savedUser = await newUser.save()
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    const { hashedPassword, ...rest } = savedUser.toObject()
    res.status(201).json({ user: rest })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' })
  }
  try {
    const user: any = await User.findOne({
      email,
    })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    const { hashedPassword, ...rest } = user.toObject()
    res.status(200).json({ user: rest })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out' })
}
