import { BaseModel } from './index.js';

const IngredienteModel = () => {
    const base = BaseModel(
		{
        	model: 'ingrediente'
    	})
    return {
        ...base
    }
}

export default { IngredienteModel }
export { IngredienteModel }
