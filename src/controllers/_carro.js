import { CarroModel } from '../models/index.js'
import { BaseController } from './index.js'
const Carro = CarroModel()

const CarroController = () => {
    const base = BaseController(
        {
            save: Carro.save,
            getOne: Carro.getOne,
            getAll: Carro.getAll,
            update: Carro.update,
            remove: Carro.remove,
            getTotalObjects: Carro.getTotalObjects,
        }
    )
    return {
        ...base,
    }
}

export default CarroController
export { CarroController }
