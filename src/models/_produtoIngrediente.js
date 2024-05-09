import { BaseModel } from './index.js';

const produtoIngredienteModel = () => {
    const base = BaseModel(
		{
        	model: 'produtoIngrediente'
    	})
    return {
        ...base
    }
}

export default { produtoIngredienteModel }
export { produtoIngredienteModel }
