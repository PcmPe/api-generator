import { IngredienteModel } from '../models/index.js'
import { BaseController } from './index.js'
const Ingrediente = IngredienteModel()

const IngredienteController = () => {
    const base = BaseController(
        {
            save: Ingrediente.save,
            getOne: Ingrediente.getOne,
            getAll: Ingrediente.getAll,
            update: Ingrediente.update,
            remove: Ingrediente.remove,
            getTotalObjects: Ingrediente.getTotalObjects,
        }
    )
    return {
        ...base,
    }
}

export default IngredienteController
export { IngredienteController }
