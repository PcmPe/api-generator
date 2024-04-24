//imports
import { UserModel } from '../models/index.js'
import { BaseController } from './index.js'

const User = UserModel()

const UserController = () => {
    const base = BaseController(
        {
            save: User.save,
            getOne: User.getOne,
            getAll: User.getAll,
            update: User.update,
            remove: User.remove
        }
    )
    return {
        ...base,
    }
}

export default UserController
export { UserController }
