import { BaseModel } from './index.js';

const CarroModel = () => {
    const base = BaseModel(
		{
        	model: 'carro'
    	}
	)
    return {
        ...base
    }
}

export default { CarroModel }
export { CarroModel }
