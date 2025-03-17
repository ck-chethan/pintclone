import express from 'express'
import { getPinComments } from '../controllers/comment.controller.ts'

const router = express.Router()
router.get('/:pinId', getPinComments)

export default router
