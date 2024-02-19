import { NextFunction, Router } from "express"
import CreateFuncaoService from "../services/Funcao/createFuncao"
import GetAllFuncaoService from "../services/Funcao/getAllFuncao"

const funcao = Router()

funcao.post("/", async (request, response, next:NextFunction) => {

    const {nome} = request.body

    const createFuncao = new CreateFuncaoService()

    try{
        const funcao = await createFuncao.execute({
            nome
        })
        return response.status(200).json({
          funcao
        });
  
    }catch(err){
      next(err)
    }
  })

funcao.get("/all", async (request, response) => {
  const { includeRelations} = request.query

  const getAllFuncaoService = new GetAllFuncaoService()

  const funcoes = await getAllFuncaoService.execute({
    includeRelations: includeRelations === "true"
  })

  return response.json(funcoes)
})


export default funcao