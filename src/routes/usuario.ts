import { NextFunction, Router, json } from "express"
import uploadSignature from "../services/Usuário/uploadAssinatura";
import CreateUsuarioService from "../services/Usuário/createUsuario";
import GetAllUsuariosService from "../services/Usuário/getAllUsuarios";
import { hash } from "../utils/bcryptjs";
import GetUsuarioService from "../services/Usuário/getUsuario";
import path from "path";
import { root_dir } from "../config";

const usuario = Router()

usuario.post("/", uploadSignature.single("file"), async (request, response, next:NextFunction) => {

    if (!request.file) {
      return response.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    
    const file = request.file
    const { path } = file;

    const {nome, sobrenome, email, senha} = request.body

    const senha_hash = await hash({password:senha})

    const createUsuario = new CreateUsuarioService()

    try{
        const user = await createUsuario.execute({
            nome:nome,
            sobrenome:sobrenome,
            assinatura_caminho:path,
            email:email,
            senha: senha_hash
        })
        return response.status(200).json({
          user,
          file
        });
  
    }catch(err){
      next(err)
    }
  })

usuario.get("/all", async (request, response) => {
  const { includeRelations} = request.query

  const getAllUserService = new GetAllUsuariosService()

  const users = await getAllUserService.execute()

  return response.json(users)
})

usuario.get("/:id", async (request, response) => {
  const id = request.params.id
  const getUsuarioService = new GetUsuarioService()

  const user = await getUsuarioService.execute({
    id
  })

  return response.json(user)
})

usuario.get("/download/:id", async (request, response) => {
  const id = request.params.id

  const getUsuarioService = new GetUsuarioService()

  const assinatura = await getUsuarioService.execute({
    id:id
  })

  if(!assinatura) return response.status(400).json({ error: 'Nenhum documento encontrado' });

  console.log()

  response.download(path.join(root_dir, assinatura.assinatura_caminho));

})


export default usuario