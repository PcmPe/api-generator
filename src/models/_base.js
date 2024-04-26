import { prisma } from '../db/index.js'

const BaseModel = ({ model = '' }) => {

    const save = async (params) => {
        //CASE 1: (1 - N)
        if (params.connect) {
            const { connect, relation, ...data } = params
            const dataConnect = connect.map(id => ({ id }))
            try {
                const newobj = await prisma[model].create({
                    data: {
                        ...data,
                        [relation]: {
                            connect: dataConnect
                        }
                    }
                })
                return newobj
            } catch (error) {
                console.log(error)
                throw new Error('Erro ao salvar objeto no banco de dados!')
            }
        }
        //CASE 2: (N - N)
        //TODO:
        //CASE 3: No relations
        else {
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
    const getAll = async (page, pageSize, include) => {
        try {
            const skip = (page - 1) * pageSize
            const obj = await prisma[model].findMany({
                take: pageSize,
                skip: skip,
                include: include
            })
            return obj
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao ler objetos no banco de dados!')
        }
    }
    const getTotalObjects = async () => {
        try {
            const count = await prisma[model].count();
            return count
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao obter total de objetos!')
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
        getTotalObjects,
        update,
        remove,
    }
}

export default BaseModel
export { BaseModel }