import { CarModel } from '../models/index.js'
import { BaseController } from './index.js'
const Car = CarModel()

const CarController = () => {
    const base = BaseController(
        {
            save: Car.save,
            getOne: Car.getOne,
            getAll: Car.getAll,
            update: Car.update,
            remove: Car.remove
        }
    )
    return {
        ...base,
    }
}

export default CarController
export { CarController }
