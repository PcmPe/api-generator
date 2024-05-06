import { BaseModel } from './index.js';

const IngredienteModel = () => {
    const base = BaseModel(
		{
        	model: 'ingrediente',
            junctionTable: 'produtoIngrediente'
    	})
    return {
        ...base
    }
}

export default { IngredienteModel }
export { IngredienteModel }
