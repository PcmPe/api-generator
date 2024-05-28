import { BaseModel } from './index.js';

const CarroModel = () => {
    const base = BaseModel(
		{
        	model: 'carro',
        	junctionTable: ''
    	})
    return {
        ...base
    }
}

export default { CarroModel }
export { CarroModel }
