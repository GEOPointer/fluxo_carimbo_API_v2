import { NextFunction, Router, json } from "express"
import CreateDocumentoEtapaService from "../services/Documento_Etapa/createDocumentoEtapa"
import GetDocumentoEtapaService from "../services/Documento_Etapa/getDocumentoEtapa"
import ImportDocumentoEtapaService from "../services/Documento_Etapa/importDocumentoEtapa"

const documento_etapa = Router()

documento_etapa.post("/", async (request, response, next:NextFunction) => {

    const {etapa_id, documento_id, usuario_id} = request.body

    const create_documento_etapa_service = new CreateDocumentoEtapaService()

    try{
        const documento_etapa = await create_documento_etapa_service.execute({
          etapa_id,
          documento_id,
          usuario_id
        })
        return response.status(200).json({
          documento_etapa
        });
  
    }catch(err){
      next(err)
    }
  })

documento_etapa.post("/import", async (request, response, next:NextFunction) => {

  const {etapa_id, documento_id, usuario_id, created_at, updated_at} = request.body

  const create_documento_etapa_service = new ImportDocumentoEtapaService()

  try{
      const documento_etapa = await create_documento_etapa_service.execute({
        etapa_id,
        documento_id,
        usuario_id,
        created_at:new Date(created_at),
        updated_at:new Date(created_at)
      })
      return response.status(200).json({
        documento_etapa
      });

  }catch(err){
    next(err)
  }
})

documento_etapa.get("/", async (request, response) => {
  const { documento_id } = request.query

  if(!documento_id){
    return response.status(400).json({
      message:"documento_id inválido"
    })
  }

  const getDocumentoEtapaService = new GetDocumentoEtapaService()

  const documento_etapa = await getDocumentoEtapaService.execute({
    documento_id: parseInt(documento_id.toString())
  })

  return response.json(documento_etapa)
})


export default documento_etapa