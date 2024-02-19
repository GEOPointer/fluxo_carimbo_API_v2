import requests
import pandas
import os
import aiohttp
import asyncio
from datetime import datetime

async def create_document(file, data):
    url = 'http://localhost:3333/documento'
    payload = aiohttp.FormData()

    for key in data:
        payload.add_field(key,data[key])

    payload.add_field("file", file)
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=payload) as resposta:
            conteudo = await resposta.json()
            return conteudo["documento"]["id"]
        
async def create_etapa(data):
    url = 'http://localhost:3333/documento_etapa/import'

    cabecalhos = {'Content-Type': 'application/json'}

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data, headers=cabecalhos) as resposta:
            conteudo = await resposta.text()

path = "Scripts\\Carimbar Restante"

all_users = requests.get("http://localhost:3333/usuario/all").json()

user_list = dict()

excel_file = pandas.read_excel(os.path.join(path,"assinaturas.xlsx"))

all_files_path = list(filter(lambda x:os.path.splitext(x)[1]==".pdf",os.listdir(path)))

for user in all_users:
    key = user["nome"]
    if user["sobrenome"] != "": key += " " + user["sobrenome"]
    excel_file["Verificação Redesenho"] = excel_file["Verificação Redesenho"].replace(key, user["id"])
    excel_file["Marcação FX (As-Built)"] = excel_file["Marcação FX (As-Built)"].replace(key, user["id"])
    excel_file["Verificação Marcação FX - Tubulação"] = excel_file["Verificação Marcação FX - Tubulação"].replace(key, user["id"])
    excel_file["Verificação Marcação FX - Processo"] = excel_file["Verificação Marcação FX - Processo"].replace(key, user["id"])
    excel_file["Verificação Fixação FX"] = excel_file["Verificação Fixação FX"].replace(key, user["id"])
    user_list[key] = user["id"]

total_str = str(excel_file.__len__())

for index, row in excel_file.iterrows():

    print(str(index+1)+"/"+total_str)

    if all_files_path.__contains__(row["Fluxograma"]+".pdf"):

        file = open(os.path.join(path, row["Fluxograma"]+".pdf", ), "rb")

        documento_id = asyncio.run(create_document(file, {
            "nome":row["Fluxograma"],
            "fluxo_id":"1",
            "descricao":""
            }))
        
        if not row["Verificação Redesenho"] == "":
            asyncio.run(create_etapa({
                "etapa_id":1,
                "documento_id":documento_id,
                "usuario_id":row["Verificação Redesenho"],
                "created_at":datetime.isoformat(row["Data"]),
                "updated_at":datetime.isoformat(row["Data"])
            }))

        if not row["Marcação FX (As-Built)"] == "":
            asyncio.run(create_etapa({
                "etapa_id":2,
                "documento_id":documento_id,
                "usuario_id":row["Marcação FX (As-Built)"],
                "created_at":datetime.isoformat(row["Data.1"]),
                "updated_at":datetime.isoformat(row["Data.1"])
            }))
        
        if not row["Verificação Marcação FX - Tubulação"] == "":
            asyncio.run(create_etapa({
                "etapa_id":3,
                "documento_id":documento_id,
                "usuario_id":row["Verificação Marcação FX - Tubulação"],
                "created_at":datetime.isoformat(row["Data.2"]),
                "updated_at":datetime.isoformat(row["Data.2"])
            }))
        
        if not row["Verificação Marcação FX - Processo"] == "":
            asyncio.run(create_etapa({
                "etapa_id":4,
                "documento_id":documento_id,
                "usuario_id":row["Verificação Marcação FX - Processo"],
                "created_at":datetime.isoformat(row["Data.3"]),
                "updated_at":datetime.isoformat(row["Data.3"])
            }))
        
        if not row["Verificação Fixação FX"] == "":
            asyncio.run(create_etapa({
                "etapa_id":5,
                "documento_id":documento_id,
                "usuario_id":row["Verificação Fixação FX"],
                "created_at":datetime.isoformat(row["Data.4"]),
                "updated_at":datetime.isoformat(row["Data.4"])
            }))