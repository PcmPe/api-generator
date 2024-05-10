import { ProdutosIngredientesModel } from '../models/index.js'
import { BaseController } from './index.js'
const ProdutosIngredientes = ProdutosIngredientesModel()

const ProdutosIngredientesController = () => {
    const include = {}
    const base = BaseController(
        {
            save: ProdutosIngredientes.save,
            getOne: ProdutosIngredientes.getOne,
            getAll: ProdutosIngredientes.getAll,
            update: ProdutosIngredientes.update,
            remove: ProdutosIngredientes.remove,
            getTotalObjects: ProdutosIngredientes.getTotalObjects,
            include: include,
        }
    )
    return {
        ...base,
    }
}

export default ProdutosIngredientesController
export { ProdutosIngredientesController }
