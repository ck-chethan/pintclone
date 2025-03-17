import express from 'express'
import userRouter from './routes/user.route.ts'
import pinRouter from './routes/pin.route.ts'
import commentRouter from './routes/comment.route.ts'
import boardRouter from './routes/board.route.ts'
import connectDB from './utils/connectDB.ts'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())

app.use('/users', userRouter)
app.use('/pins', pinRouter)
app.use('/comments', commentRouter)
app.use('/boards', boardRouter)

app.listen(port, () => {
  connectDB()
  console.log(`Server started at http://localhost:${port}`)
})
