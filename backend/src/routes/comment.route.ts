import express from 'express'
import {
  addCommment,
  getPinComments,
} from '../controllers/comment.controller.ts'
import { verifyToken } from '../middlewares/verifyToken.ts'

const router = express.Router()
router.get('/:pinId', getPinComments)
router.post('/', verifyToken, addCommment)

export default router
