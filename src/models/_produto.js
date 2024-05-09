import { BaseModel } from './index.js';

const ProdutoModel = () => {
    const base = BaseModel(
        {
            model: 'produto',
            junctionTableModel: 'produtoIngrediente'
        })
    return {
        ...base
    }
}

export default { ProdutoModel }
export { ProdutoModel }
