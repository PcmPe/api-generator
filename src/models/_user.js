import { prisma } from '../db/index.js'
import { BaseModel } from './index.js'

const UserModel = () => {
    const base = BaseModel(
        {
            model: 'usuario'
        }
    )
    const getUserByEmail = async (email) => {
        const user = await prisma.usuario.findFirst({
            where: {
                email: email
            },
        })
        return user
    }
    const getUserByRefreshToken = async (refreshToken) => {
        const user = await prisma.usuario.findFirst({
            where: {
                refreshToken: refreshToken
            }
        })
        return user
    }

    return {
        ...base,
        getUserByEmail,
        getUserByRefreshToken
    }
}

export default UserModel
export { UserModel }