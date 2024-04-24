from functions import generateModel, generateController, generateRoute

modelName = input("Digite o nome do Model: ")
generateModel(modelName=modelName)
generateController(modelName=modelName)
generateRoute(modelName=modelName)
