import { AuthController } from '../auth/index.js'
import { Router } from 'express'
const router = Router()

const { login, logout, refreshToken } = AuthController()

router.post('/login', login)
router.get('/logout', logout)
router.get('/refresh', refreshToken)

export default router;
export { router as AuthRoutes }