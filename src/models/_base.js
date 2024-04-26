import { prisma } from '../db/index.js'

const BaseModel = ({ model = '' }) => {

    const noRelations = (id, params) => {
        if (id === null) {
            return {
                data: {
                    ...params
                }
            }
        }
        if (id) {
            return {
                where: {
                    id: id
                },
                data: {
                    ...params
                }
            }
        }
    }
    const oneToManyRelation = (id, params) => {
        if (id === null) {
            const { connect, relation, ...data } = params
            const dataConnect = connect.map(id => ({ id }))
            return {
                data: {
                    ...data,
                    [relation]: {
                        connect: dataConnect
                    }
                }
            }
        }
        if (id) {
            const { connect, relation, ...data } = params
            const dataConnect = connect.map(id => ({ id }))
            return {
                where: {
                    id: id
                },
                data: {
                    ...data,
                    [relation]: {
                        connect: dataConnect
                    }
                }
            }
        }
    }
    const save = async (params) => {
        //@Description: Saving one-to-many relation
        if (params.connect) {
            try {
                const newobj = await prisma[model].create(oneToManyRelation(null, params))
                return newobj
            } catch (error) {
                console.log(error)
                throw new Error('Erro ao salvar objeto no banco de dados!')
            }
        }
        //@Description: Saving a table with no relations
        if (!params.connect) {
            try {
                const newobj = await prisma[model].create(noRelations(null, params))
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
        //@Description: Updating one-to-many relation
        if (params.connect) {
            try {
                const obj = await prisma[model].update(oneToManyRelation(id, params));
                return obj;
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao atualizar objeto no banco de dados!')
            }
        }
        //@Description: Updating a table with no relations
        if (!params.connect) {
            try {
                const obj = await prisma[model].update(noRelations(id, params));
                return obj;
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao atualizar objeto no banco de dados!')
            }
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