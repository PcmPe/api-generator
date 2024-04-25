from functions import generateTable ,generateModel, generateController, generateRoute, insertRouteIntoIndex, insertImportIntoIndex

tableName = input("Digite o nome da tabela: ")
modelName = input("Digite o nome do Model: ")
routeName = input("Digite o nome da Rota: ")

generateTable(tableName=tableName)
generateModel(modelName=modelName)
generateController(modelName=modelName)
generateRoute(modelName=modelName)
insertRouteIntoIndex(modelName=modelName, routeName=routeName)
insertImportIntoIndex(modelName=modelName)
