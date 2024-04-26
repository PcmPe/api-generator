import { prisma } from '../db/index.js'

const BaseModel = ({ model = '' }) => {

    const save = async (params) => {
        try {
            const newobj = await prisma[model].create({
                data: {
                    ...params
                }
            })
            return newobj
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao salvar objeto no banco de dados!')
        }
    }
    const getOne = async (id) => {
        try {
            const obj = await prisma[model].findFirst({
                where: {
                    id: id
                },
            })
            return obj
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao ler objeto no banco de dados!')
        }
    }
    const getAll = async (page, pageSize) => {
        try {
            const skip = (page - 1) * pageSize
            const obj = await prisma[model].findMany({
                take: pageSize,
                skip: skip,
            })
            return obj
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao ler objetos no banco de dados!')
        }
    }
    const update = async (id, params) => {
        try {
            const obj = await prisma[model].update({
                where: {
                    id: id
                },
                data: {
                    ...params
                }
            });
            return obj;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao atualizar objeto no banco de dados!')
        }
    }
    const remove = async (id) => {
        try {
            const obj = await prisma[model].delete({
                where: {
                    id: id
                }
            });
            return obj;
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao deleter objeto no banco de dados!')
        }
    };

    return {
        save,
        getOne,
        getAll,
        update,
        remove,
    }
}

export default BaseModel
export { BaseModel }