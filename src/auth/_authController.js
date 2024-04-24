import { UserModel } from '../models/index.js'
import { Helpers } from '../helpers/index.js'
import { AuthModel } from './index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const { getUserByEmail, getUserByRefreshToken } = UserModel()
const { generateToken, removeToken } = AuthModel()
const { validateField } = Helpers()

const AuthController = () => {
    const login = async (req, res) => {
        const { email, pwd } = req.body

        if (
            !validateField(res, email, "O email é obrigatório") ||
            !validateField(res, pwd, "O pwd é obrigatório")
        ) { return }

        const user = await getUserByEmail(email)
        if (!user) return res.sendStatus(401)

        const match = await bcrypt.compare(pwd, user.pwd)

        if (match) {
            const refreshToken = await generateToken(user.id, user.name)
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({ refreshToken: refreshToken })
        } else {
            res.sendStatus(401)
        }
    }
    const logout = async (req, res) => {
        //if doesn't came cookies on request
        const cookies = req?.cookies
        if (!cookies?.jwt) return res.sendStatus(204)

        //if came cookies on request, but don't came user
        const refreshToken = cookies.jwt
        const user = await getUserByRefreshToken(refreshToken)
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
            return res.sendStatus(204)
        }

        //if came cookies and users on request
        removeToken(user.id)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        res.sendStatus(204)
    }
    const refreshToken = async (req, res) => {
        const cookies = req?.cookies
        if (!cookies?.jwt) return res.sendStatus(401)

        const refreshToken = cookies.jwt

        const user = await getUserByRefreshToken(refreshToken)
        if (!user) return res.sendStatus(401)

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            (err, decoded) => {
                if (err) return res.sendStatus(403)
                const accessToken = jwt.sign(
                    {
                        "id": decoded.id,
                        "name": decoded.name,
                    },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '60s' }
                )
                res.json({ accessToken })
            }
        )
    }

    return {
        login,
        logout,
        refreshToken,
    }
}

export default AuthController
export { AuthController }