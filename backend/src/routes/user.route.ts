import { Router } from 'express'
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/user.controller.ts'

const router = Router()

router.get('/:username', getUser)
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/logout', logoutUser)

export default router
