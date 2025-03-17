import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthRequest extends Request {
  userId?: any // Extend Request to include user data
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token // Get token from cookies

  if (!token) {
    res.status(401).json({ message: 'Access Denied: No token provided' })
  }

  try {
    const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId // Store decoded user data in request
    console.log(decoded)

    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' })
  }
}
