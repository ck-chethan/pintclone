import express from 'express'
import { getPin, getPins } from '../controllers/pin.controller.ts'

const router = express.Router()
router.get('/', getPins)
router.get('/:id', getPin)
export default router
