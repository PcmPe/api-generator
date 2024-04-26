from os import getcwd, path
import mysql.connector
import subprocess

def generateTable(tableName):
    conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="api-generator"
    )
    cursor = conn.cursor()
    
    tableRows = int(input("Digite o número de campos dessa tabela: "))
    
    tableFields = []
    for i in range(tableRows):
        fieldName = input("Digite o nome do campo: ")
        fieldType = input("Digite o tipo do campo: ")
        field = {'fieldName': fieldName, 'fieldType': fieldType}
        tableFields.append(field)

    sql_create_table = f"CREATE TABLE IF NOT EXISTS {tableName} (id INT AUTO_INCREMENT PRIMARY KEY"

    for field in tableFields:
        nome_field = field['fieldName']
        if field['fieldType'] == 'text':
            tipo_campo = 'VARCHAR(255)'
        elif field['fieldType'] == 'int':
            tipo_campo = 'INT'
        sql_create_table += f", {nome_field} {tipo_campo}"
        
    sql_create_table += ");"
    cursor.execute(sql_create_table)
    subprocess.run(["yarn", "prisma", "db", "pull"])

def generateModel(modelName):
    modelCode = (
        f"import {{ BaseModel }} from './index.js';\n\n"
        f"const {modelName}Model = () => {{\n"
        f"    const base = BaseModel(\n\t\t{{\n"
        f"        \tmodel: '{modelName.lower()}'\n"
        f"    \t}})\n"
        f"    return {{\n"
        f"        ...base\n"
        f"    }}\n"
        f"}}\n\n"
        f"export default {{ {modelName}Model }}\n"
        f"export {{ {modelName}Model }}\n"
    )
    filePath = path.join(getcwd(), "src", "models", f"_{modelName.lower()}.js")
    indexPath = path.join(getcwd(), "src", "models", "index.js")
    with open(filePath, 'w') as f:
        f.write(modelCode)
    with open(indexPath, 'a') as f:
        f.write(f"\nexport * from './_{modelName.lower()}.js'")
        
def generateController(modelName):
    controller_code = (
        f"import {{ {modelName}Model }} from '../models/index.js'\n"
        f"import {{ BaseController }} from './index.js'\n"
        f"const {modelName} = {modelName}Model()\n\n"
        f"const {modelName}Controller = () => {{\n"
        f"    const include = {{}}\n"
        f"    const base = BaseController(\n"
        f"        {{\n"
        f"            save: {modelName}.save,\n"
        f"            getOne: {modelName}.getOne,\n"
        f"            getAll: {modelName}.getAll,\n"
        f"            update: {modelName}.update,\n"
        f"            remove: {modelName}.remove,\n"
        f"            getTotalObjects: {modelName}.getTotalObjects,\n"
        f"            include: include,\n"
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
    indexPath = path.join(getcwd(), "src", "controllers", "index.js")
    with open(filePath, 'w') as f:
        f.write(controller_code)
    with open(indexPath, 'a') as f:
        f.write(f"\nexport * from './_{modelName.lower()}.js'")
       
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
    indexPath = path.join(getcwd(), "src", "routes", "index.js")
    with open(filePath, 'w') as f:
        f.write(router_code)
    with open(indexPath, 'a') as f:
        f.write(f"\nexport * from './_{modelName.lower()}.js'")

def insertRouteIntoIndex(routeName, modelName):
    new_code = f"app.use('/{routeName}', {modelName}Routes);\n"
    with open("index.js", "r+") as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            if "//Routes" in line:
                lines.insert(i + 1, new_code)
                f.seek(0)
                f.writelines(lines)
                break

def insertImportIntoIndex(modelName):
    palavra_adicionar = f'{modelName}Routes'

    with open('index.js', 'r') as arquivo:
        linhas = arquivo.readlines()

    linha_desejada = linhas[5] 
    nova_linha = linha_desejada.replace('}', f', {palavra_adicionar}' + ' }')

    linhas[5] = nova_linha

    with open('index.js', 'w') as arquivo:
        arquivo.writelines(linhas)
    
def insertIntoPrismaSchema(tableName, modelName):
    filepath = path.join(getcwd(), "src", "prisma", "schema.prisma")
    with open(filepath, 'r') as f:
        lines = f.readlines()

    for ix, line in enumerate(lines):
        if f'model {tableName}' in line:
            lines[ix] = line.replace(f'{tableName}' + ' {', f'{modelName.lower()}' + ' ' + '{' f'\n\t@@map("{tableName}")')

    with open(filepath, 'w') as file:
        file.writelines(lines)
        
    subprocess.run(["yarn", "prisma", "generate"])