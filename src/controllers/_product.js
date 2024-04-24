//imports
import { ProdutoModel } from '../models/index.js'
import { BaseController } from './index.js'
const Product = ProdutoModel()

const ProductController = () => {
    const base = BaseController(
        {
            save: Product.save,
            getOne: Product.getOne,
            getAll: Product.getAll,
            update: Product.update,
            remove: Product.remove
        }
    )
    return {
        ...base,
    }
}

export default ProductController
export { ProductController }
