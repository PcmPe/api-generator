import { BaseModel } from './index.js';

const ProdutosIngredientesModel = () => {
    const base = BaseModel(
		{
        	model: 'produtosingredientes',
        	junctionTable: ''
    	})
    return {
        ...base
    }
}

export default { ProdutosIngredientesModel }
export { ProdutosIngredientesModel }
