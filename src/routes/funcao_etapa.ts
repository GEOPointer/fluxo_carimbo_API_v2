import { NextFunction, Router } from "express"
import CreateFuncao_EtapaService from "../services/Funcao_Etapa/createFuncao_Etapa"
import GetAllFuncao_EtapaService from "../services/Funcao_Etapa/getAllFuncao_Etapa"

const funcao_etapa = Router()

funcao_etapa.post("/", async (request, response, next:NextFunction) => {

    const {etapa_id, funcao_id} = request.body

    const createFuncao = new CreateFuncao_EtapaService()

    try{
        const funcao_etapa = await createFuncao.execute({
          etapa_id,
          funcao_id
        })
        return response.status(200).json({
          funcao_etapa
        });
  
    }catch(err){
      next(err)
    }
  })

funcao_etapa.get("/all", async (request, response) => {
  const { includeRelations, funcao_id, etapa_id} = request.query

  var funcao_id_tratado = undefined
  var etapa_id_tratado = undefined

  if(funcao_id) funcao_id_tratado = parseInt(funcao_id.toString())
  if(etapa_id) etapa_id_tratado = parseInt(etapa_id.toString())

  const getAllFuncao_EtapaService = new GetAllFuncao_EtapaService()

  const funcoes = await getAllFuncao_EtapaService.execute({
    includeRelations: includeRelations === "true",
    funcao_id:funcao_id_tratado,
    etapa_id:etapa_id_tratado
  })

  return response.json(funcoes)
})


export default funcao_etapa