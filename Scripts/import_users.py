import pandas
import requests
import aiohttp
import asyncio

df = pandas.read_excel("Scripts\\import_users\\Funções Carimbo.xlsx")
df = df.fillna("")
all_funcoes = requests.get("http://localhost:3333/funcao/all").json()

async def create_user(file, data):
    url = 'http://localhost:3333/usuario'
    payload = aiohttp.FormData()

    for key in data:
        payload.add_field(key,data[key])

    payload.add_field("file", file)
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=payload) as resposta:
            conteudo = await resposta.json()
            return conteudo["user"]["id"]
        
async def create_funcao(data):
    url = 'http://localhost:3333/funcao_usuario'

    cabecalhos = {'Content-Type': 'application/json'}

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data, headers=cabecalhos) as resposta:
            conteudo = await resposta.text()

for index, row in df.iterrows():
    nome_completo = row["Nome"]
    nome = nome_completo.split(" ")[0]
    if nome_completo.split(" ").__len__() > 1: sobrenome = nome_completo.split(" ")[1]
    else: sobrenome = ""
    email = row["e-mail"]
    senha = "gpr@12345"
    file = open("Scripts\\import_users\\assinaturas\\"+nome_completo+".png","rb")
    user_id = asyncio.run(create_user(file,{
        "nome":nome,
        "sobrenome":sobrenome,
        "email":email,
        "senha":senha
    }))
    funcoes_keys = list(filter(lambda x:x.__contains__("função"),row.keys()))
    funcoes_keys = list(filter(lambda x:row[x] != "",funcoes_keys))
    for funcao in funcoes_keys:
        funcao_id = list(filter(lambda x:x["nome"] == row[funcao], all_funcoes))[0]["id"]
        asyncio.run(create_funcao({"usuario_id":user_id, "funcao_id":funcao_id}))