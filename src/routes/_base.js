import { Router } from 'express'
const router = Router()

const BaseRoutes = ({ create, readOne, readAll, updateObj, removeObj }) => {
    router.route('/')
        .post(create)
        .get(readAll)

    router.route('/:id')
        .get(readOne)
        .put(updateObj)
        .delete(removeObj)

    return router
}

export default BaseRoutes
export { BaseRoutes }