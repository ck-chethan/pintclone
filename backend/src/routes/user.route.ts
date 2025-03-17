import { Router } from 'express'
import { getUser } from '../controllers/user.controller.ts'

const router = Router()

router.get('/:username', getUser)

export default router
