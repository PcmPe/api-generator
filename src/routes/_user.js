import { UserController } from '../controllers/index.js';
import { BaseRoutes } from './index.js'

const User = UserController()
const userRoutes = BaseRoutes(
    {
        create: User.create,
        readAll: User.readAll,
        readOne: User.readOne,
        updateObj: User.updateObj,
        removeObj: User.removeObj,
    }
)

export default userRoutes
export { userRoutes as UserRoutes }
