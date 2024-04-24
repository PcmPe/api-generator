from os import getcwd, path, listdir

def generateModel(modelName):
    modelCode = (
        f"import {{ BaseModel }} from './index.js';\n\n"
        f"const {modelName}Model = () => {{\n"
        f"    const base = BaseModel(\n\t\t{{\n"
        f"        \tmodel: '{modelName.lower()}'\n"
        f"    \t}}\n\t)\n"
        f"    return {{\n"
        f"        ...base\n"
        f"    }}\n"
        f"}}\n\n"
        f"export default {{ {modelName}Model }}\n"
        f"export {{ {modelName}Model }}\n"
    )
    filePath = path.join(getcwd(), "src", "models", f"_{modelName.lower()}.js")
    with open(filePath, 'w') as f:
        f.write(modelCode)
        
def generateController(modelName):
    controller_code = (
        f"import {{ {modelName}Model }} from '../models/index.js'\n"
        f"import {{ BaseController }} from './index.js'\n"
        f"const {modelName} = {modelName}Model()\n\n"
        f"const {modelName}Controller = () => {{\n"
        f"    const base = BaseController(\n"
        f"        {{\n"
        f"            save: {modelName}.save,\n"
        f"            getOne: {modelName}.getOne,\n"
        f"            getAll: {modelName}.getAll,\n"
        f"            update: {modelName}.update,\n"
        f"            remove: {modelName}.remove\n"
        f"        }}\n"
        f"    )\n"
        f"    return {{\n"
        f"        ...base,\n"
        f"    }}\n"
        f"}}\n\n"
        f"export default {modelName}Controller\n"
        f"export {{ {modelName}Controller }}\n"
    )
    filePath = path.join(getcwd(), "src", "controllers", f"_{modelName.lower()}.js")
    with open(filePath, 'w') as f:
        f.write(controller_code)
       
def generateRoute(modelName):
    router_code = (
        f"import {{ {modelName}Controller }} from '../controllers/index.js'\n"
        f"import {{ Router }} from 'express'\n"
        f"const router = Router()\n\n"
        f"const {{ create, readOne, readAll, updateObj, removeObj }} = {modelName}Controller()\n\n"
        f"router.route('/')\n"
        f"    .post(create)\n"
        f"    .get(readAll)\n\n"
        f"router.route('/:id')\n"
        f"    .get(readOne)\n"
        f"    .put(updateObj)\n"
        f"    .delete(removeObj)\n\n"
        f"export default router;\n"
        f"export {{ router as {modelName}Routes }};\n"
    )
    filePath = path.join(getcwd(), "src", "routes", f"_{modelName.lower()}.js")
    with open(filePath, 'w') as f:
        f.write(router_code)