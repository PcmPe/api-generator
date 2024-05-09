import { produtoIngredienteController } from '../controllers/index.js'
import { Router } from 'express'
const router = Router()

const { create, readOne, readAll, updateObj, removeObj } = produtoIngredienteController()

router.route('/')
    .put(updateObj)
    // .post(create)
    // .get(readAll)

router.route('/:id')
    // .get(readOne)
    // .delete(removeObj)

export default router;
export { router as produtoIngredienteRoutes };
