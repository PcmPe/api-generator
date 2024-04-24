import { prisma } from '../db/index.js'
import jwt from 'jsonwebtoken'

const AuthModel = () => {
    const generateToken = async (id, name) => {
        try {
            const accessToken = jwt.sign(
                {
                    "id": id,
                    "name": name,
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '60s' }
            );
            const refreshToken = jwt.sign(
                {
                    "id": id,
                    "name": name,
                },
                process.env.REFRESH_TOKEN,
                { expiresIn: '120s' }
            );
            await prisma.usuario.update({
                where: {
                    id: id
                },
                data: {
                    refreshToken: refreshToken
                }
            });
            return refreshToken
        } catch (error) {
            console.log(error)
        }
    }

    const removeToken = async (id) => {
        try {
            await prisma.usuario.update({
                where: {
                    id: id
                },
                data: {
                    refreshToken: ''
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        removeToken,
        generateToken
    }
}

export default AuthModel
export { AuthModel }