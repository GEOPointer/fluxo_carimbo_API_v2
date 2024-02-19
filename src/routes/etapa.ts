import { NextFunction, Router, json } from "express"
import GetAllFluxosService from "../services/Fluxo/getAllFluxos";
import CreateEtapaService from "../services/Etapa/createEtapa";
import GetEtapasService from "../services/Etapa/getEtapas";

const etapa = Router()

etapa.post("/", async (request, response, next:NextFunction) => {

    const {nome, fluxo_id} = request.body

    const createFluxo = new CreateEtapaService()

    try{
        const flow = await createFluxo.execute({
            nome,
            fluxo_id
        })
        return response.status(200).json({
          flow
        });
  
    }catch(err){
      next(err)
    }
  })

etapa.get("/:id", async (request, response, next:NextFunction) => {
  const { includeRelations } = request.query
  const id = request.params.id

  const getStapsService = new GetEtapasService()

  try{
    const users = await getStapsService.execute({
      includeRelations: includeRelations === "true",
      fluxo_id:parseInt(id)
    })
  
    return response.json(users)
  }catch(err){
    next(err)
  }
})


export default etapa