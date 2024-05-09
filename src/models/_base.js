import { prisma } from '../db/index.js'

const BaseModel = ({ model = '', junctionTableModel = null }) => {

    const getTotalObjects = async () => {
        try {
            const count = await prisma[model].count();
            return count
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao obter total de objetos!')
        }
    }

    const noRelations = (id, params) => {
        if (id === "create") {
            return {
                data: {
                    ...params
                }
            }
        }
        if (id !== "create") {
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
        if (id === "create") {
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
        if (id !== "create") {
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
    const manyToManyRelation = async (id, params) => {
        if (id === "create") {
            const { modelRelated, associationTable, connect, type, method, ...data } = params
            const dataConnect = connect.map(id => ({ id }))
            console.log({ modelRelated, associationTable, dataConnect, type, data })

            //TODO: ADICIONAR SUPORTE PARA VARIAS TABELAS DE LIGACOES RELACIONADO AO MESMO
            const obj = await prisma.produto.create({
                data: {
                    ...data,
                    [associationTable]: {
                        create: dataConnect.map(item => ({
                            [modelRelated]: {
                                connect: item
                            }
                        })),
                    }
                }
            })
            return obj
        }
        if (id !== "create") {
            const { modelId, modelField, connectId, connectField } = params
            const obj = await prisma[model].findFirst({
                where: {
                    [modelField]: Number(modelId)
                }
            })
            const objUpdated = await prisma[model].update({
                where: {
                    id: obj.id
                },
                data: {
                    [connectField]: Number(connectId)
                }
            })
            return objUpdated
        }
    }

    const save = async (params) => {
        //@Description: Saving many-to-many relation
        if (params.type === "N-N" && params.method === "create") {
            try {
                const newobj = await manyToManyRelation("create", params)
                return newobj
            } catch (error) {
                console.log(error)
                throw new Error('Erro ao salvar objeto no banco de dados!')
            }
        }
        //@Description: Saving one-to-many relation
        if (params.type === "1-N" && params.method === "create") {
            try {
                const newobj = await prisma[model].create(oneToManyRelation("create", params))
                return newobj
            } catch (error) {
                console.log(error)
                throw new Error('Erro ao salvar objeto no banco de dados!')
            }
        }
        //@Description: Saving a table with no relations
        if (!params.type && params.method === "create") {
            try {
                const newobj = await prisma[model].create(noRelations("create", params))
                return newobj
            } catch (error) {
                console.log(error)
                throw new Error('Erro ao salvar objeto no banco de dados!')
            }
        }
    }
    const getOne = async (id, include) => {
        try {
            const obj = await prisma[model].findFirst({
                where: {
                    id: id
                },
                include: include
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
    const update = async (id, params) => {
        //@Description: Updating many-to-many relation
        if (params.type === "N-N" && params.method === "update") {
            try {
                const updatedObject = await manyToManyRelation(id, params)
                if (updatedObject.id) delete updatedObject.id
                return updatedObject
            } catch (error) {
                console.log(error)
                throw new Error('Erro ao atualizar objeto no banco de dados!')
            }
        }
        //@Description: Updating one-to-many relation
        if (params.type === "1-N" && params.method === "update") {
            try {
                const obj = await prisma[model].update(oneToManyRelation(id, params));
                return obj;
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao atualizar objeto no banco de dados!')
            }
        }
        //@Description: Updating a table with no relations
        if (!params.type && params.method === "update") {
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
            if (junctionTableModel === null) {
                const obj = await prisma[model].delete({
                    where: {
                        id: id
                    }
                })
                return obj
            }
            if (junctionTableModel !== null) {
                const idFk = `id_${model}`
                console.log(idFk)
                await prisma[junctionTableModel].deleteMany({
                    where: {
                        [idFk]: id
                    }
                })
                const obj = await prisma[model].delete({
                    where: {
                        id: id
                    }
                })
                return obj
            }
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao deleter objeto no banco de dados!')
        }
    }

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