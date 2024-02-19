import { NextFunction, Router } from "express"
import CreateFuncao_UsuarioService from "../services/Funcao_Usuario/createFuncao_Usuario"
import GetAllFuncao_UsuarioService from "../services/Funcao_Usuario/getAllFuncao_Usuario"

const funcao_usuario = Router()

funcao_usuario.post("/", async (request, response, next:NextFunction) => {

    const {usuario_id, funcao_id} = request.body

    const createFuncao = new CreateFuncao_UsuarioService()

    try{
        const funcao_usuario = await createFuncao.execute({
          usuario_id,
          funcao_id
        })
        return response.status(200).json({
          funcao_usuario
        });
  
    }catch(err){
      next(err)
    }
  })

funcao_usuario.get("/all", async (request, response) => {
  const { includeRelations, funcao_id, usuario_id} = request.query

  var funcao_id_tratado = undefined

  if(funcao_id) funcao_id_tratado = parseInt(funcao_id.toString())

  const getAllFuncao_UsuarioService = new GetAllFuncao_UsuarioService()

  const funcoes = await getAllFuncao_UsuarioService.execute({
    includeRelations: includeRelations === "true",
    funcao_id:funcao_id_tratado,
    usuario_id:usuario_id?.toString()
  })

  return response.json(funcoes)
})


export default funcao_usuario