import { CarroController } from '../controllers/index.js'
import { Router } from 'express'
const router = Router()

const { create, readOne, readAll, updateObj, removeObj } = CarroController()

router.route('/')
    .post(create)
    .get(readAll)

router.route('/:id')
    .get(readOne)
    .put(updateObj)
    .delete(removeObj)

export default router;
export { router as CarroRoutes };
