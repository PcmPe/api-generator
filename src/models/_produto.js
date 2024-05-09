import { BaseModel } from './index.js';

const ProdutoModel = () => {
    const base = BaseModel(
        {
            model: 'produto',
            junctionTable: 'produtos_ingredientes'
        })
    return {
        ...base
    }
}

export default { ProdutoModel }
export { ProdutoModel }
