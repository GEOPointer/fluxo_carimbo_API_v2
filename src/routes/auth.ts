import { NextFunction, Router } from "express"
import AutenticarService from "../services/Usuário/autenticar"
import GetTokenService from "../services/Usuário/getToken"

const auth = Router()

auth.post("/", async (request, response, next:NextFunction) => {
    const { email, senha } = request.body

    const authenticateService = new AutenticarService()

    try{
        const credentials = await authenticateService.execute({
            email,
            password: senha,
        })
        return response.json(credentials)    
    }catch(error){
        return response.status(400).json({
            error
          });
    }
    

})

auth.get("/", async (request, response) => {
    const {token:token_hash} = request.query

    const get_token_service = new GetTokenService()
  
    const token = await get_token_service.execute({
        token_hash:token_hash!.toString()
    })
  
    return response.json(token)
  })

export default auth