from functions import generateModel, generateController, generateRoute, insertRouteIntoIndex, insertImportIntoIndex

modelName = input("Digite o nome do Model: ")
routeName = input("Digite o nome da Rota: ")
generateModel(modelName=modelName)
generateController(modelName=modelName)
generateRoute(modelName=modelName)
insertRouteIntoIndex(modelName=modelName, routeName=routeName)
insertImportIntoIndex(modelName=modelName)
