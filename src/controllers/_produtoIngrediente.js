import { produtoIngredienteModel } from '../models/index.js'
import { BaseController } from './index.js'
const produtoIngrediente = produtoIngredienteModel()

const produtoIngredienteController = () => {
    const include = {}
    const base = BaseController(
        {
            save: produtoIngrediente.save,
            getOne: produtoIngrediente.getOne,
            getAll: produtoIngrediente.getAll,
            update: produtoIngrediente.update,
            remove: produtoIngrediente.remove,
            getTotalObjects: produtoIngrediente.getTotalObjects,
            include: include,
        }
    )
    return {
        ...base,
    }
}

export default produtoIngredienteController
export { produtoIngredienteController }
