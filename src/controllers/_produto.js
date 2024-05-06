import { ProdutoModel } from '../models/index.js'
import { BaseController } from './index.js'
const Produto = ProdutoModel()

const ProdutoController = () => {
    const include = { produtos_ingredientes: true }
    const base = BaseController(
        {
            save: Produto.save,
            getOne: Produto.getOne,
            getAll: Produto.getAll,
            update: Produto.update,
            remove: Produto.remove,
            getTotalObjects: Produto.getTotalObjects,
            include: include,
        }
    )
    return {
        ...base,
    }
}

export default ProdutoController
export { ProdutoController }
