import { BaseModel } from './index.js';

const CarModel = () => {
    const base = BaseModel(
		{
        	model: 'car'
    	}
	)
    return {
        ...base
    }
}

export default { CarModel }
export { CarModel }
