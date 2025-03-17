import { Request, Response } from 'express'
import User from '../models/user.model.ts'
import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import Follow from '../models/follow.model.ts'

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

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username }).select(
    '-hashedPassword'
  )
  const followerCount = await Follow.countDocuments({
    followee: user._id,
  })
  const followingCount = await Follow.countDocuments({
    follower: user?._id,
  })

  const token = req.cookies.token
  if (!token) {
    res
      .status(200)
      .json({ user, followerCount, followingCount, isFollowing: false })
  } else {
    try {
      const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET)

      req.userId = decoded.userId // Store decoded user data in request
      const isExists = await Follow.exists({
        follower: req.userId,
        followee: user?._id,
      })

      res.status(200).json({
        user,
        followerCount,
        followingCount,
        isFollowing: isExists ? true : false,
      })
    } catch (error) {
      res.status(403).json({ message: 'Invalid or expired token' })
    }
  }
}

export const followUser = async (req: Request, res: Response) => {
  const { username } = req.params
  const user = await User.findOne({ username })
  if (!user) {
    res.status(404).json({ message: 'User not found' })
  }

  const isFollowing = await Follow.findOne({
    follower: req.userId,
    followee: user._id,
  })
  if (isFollowing) {
    await Follow.findByIdAndDelete(isFollowing._id)
    res.status(200).json({ message: 'Unfollowed' })
  } else {
    const follow = new Follow({ follower: req.userId, followee: user._id })
    await follow.save()
    res.status(201).json(follow)
  }
}
