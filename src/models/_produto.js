import { BaseModel } from './index.js';

const ProdutoModel = () => {
    const base = BaseModel(
		{
        	model: 'produto'
    	})
    return {
        ...base
    }
}

export default { ProdutoModel }
export { ProdutoModel }
