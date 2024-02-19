import pandas
import os
import json

df = pandas.read_excel("Scripts\\Carimbar Restante\\assinaturas.xlsx")
fluxogramas_planilha = list(df["Fluxograma"])
fluxogramas_arquivos = list(filter(lambda x:os.path.splitext(x)[1]!=".xlsx",os.listdir("Scripts\\Carimbados")))
fluxogramas_arquivos = list(map(lambda x:os.path.splitext(x)[0],fluxogramas_arquivos))
restante = list()
print(df["Fluxograma"])
for fluxograma in fluxogramas_planilha:
    if not fluxogramas_arquivos.__contains__(fluxograma): restante.append(fluxograma)
json.dump(restante,open("restante.json","w", encoding="utf-8"),indent=4)