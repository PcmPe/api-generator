from functions import generateTable ,generateModel, generateController, generateRoute, insertRouteIntoIndex, insertImportIntoIndex, insertIntoPrismaSchema

# tableName = input("Digite o nome da tabela: ")
modelName = input("Digite o nome do Model: ")
fileName = input("Digite o nome do Arquivo: ")
junctionTable = input("Digite o nome do Model da tabela de ligação (Se não tiver apenas aperte enter sem digitar nada): ")
routeName = input("Digite o nome da Rota: ")

# generateTable(tableName=tableName)
generateModel(modelName=modelName, fileName=fileName, junctionTable=junctionTable)
generateController(modelName=modelName, fileName=fileName)
generateRoute(modelName=modelName, fileName=fileName)
insertRouteIntoIndex(modelName=modelName, routeName=routeName)
insertImportIntoIndex(modelName=modelName)
# insertIntoPrismaSchema(tableName=tableName, modelName=modelName)