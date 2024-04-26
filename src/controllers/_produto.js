import { ProdutoModel } from '../models/index.js'
import { BaseController } from './index.js'
const Produto = ProdutoModel()

const ProdutoController = () => {
    const base = BaseController(
        {
            save: Produto.save,
            getOne: Produto.getOne,
            getAll: Produto.getAll,
            update: Produto.update,
            remove: Produto.remove,
            getTotalObjects: Produto.getTotalObjects,
        }
    )
    return {
        ...base,
    }
}

export default ProdutoController
export { ProdutoController }
