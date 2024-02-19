import { NextFunction, Router, json } from "express"
import CreateFluxoService from "../services/Fluxo/createFluxo";
import GetAllFluxosService from "../services/Fluxo/getAllFluxos";

const fluxo = Router()

fluxo.post("/", async (request, response, next:NextFunction) => {

    const {nome, descricao} = request.body

    const createFluxo = new CreateFluxoService()

    try{
        const flow = await createFluxo.execute({
            nome:nome,
            descricao: descricao
        })
        return response.status(200).json({
          flow
        });
  
    }catch(err){
      next(err)
    }
  })

fluxo.get("/all", async (request, response) => {
  const { includeRelations} = request.query

  const getAllUserService = new GetAllFluxosService()

  const users = await getAllUserService.execute({
    includeRelations: includeRelations === "true"
  })

  return response.json(users)
})


export default fluxo