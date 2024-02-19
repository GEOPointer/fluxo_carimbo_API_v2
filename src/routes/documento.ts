import { NextFunction, Router, json } from "express"
import CreateDocumentoService from "../services/Documento/createDocumento"
import GetAllDocumentosService from "../services/Documento/getAllDocumentos"
import uploadDocumento from "../services/Documento/uploadDocumento"
import GetDocumentoService from "../services/Documento/getDocument"
import path from "path"
import { root_dir } from "../config"
import UpdateDocumentoService from "../services/Documento/updateDocumento"

const documento = Router()

documento.post("/", uploadDocumento.single("file") ,async (request, response, next:NextFunction) => {

    if (!request.file) {
      return response.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const file = request.file
    const { path } = file;

    const {nome, descricao, fluxo_id} = request.body

    const createDocumento = new CreateDocumentoService()

    try{
        const documento = await createDocumento.execute({
            nome,
            descricao,
            caminho:path,
            nome_arquivo:file.originalname,
            status:"Em andamento",
            fluxo_id:parseInt(fluxo_id)
        })
        return response.status(200).json({
          documento,
          file
        });
  
    }catch(err){
      next(err)
    }
  })

documento.get("/all", async (request, response) => {
  const { includeRelations, status} = request.query
  const getAllStapsService = new GetAllDocumentosService()

  const users = await getAllStapsService.execute({
    includeRelations: includeRelations === "true",
    status:status?.toString(),
  })

  return response.json(users)
})

documento.get("/:id", async (request, response) => {
  const {includeRelations} = request.query
  const id = request.params.id
  const getAllStapsService = new GetDocumentoService()

  const users = await getAllStapsService.execute({
    includeRelations: includeRelations === "true",
    id:parseInt(id)
  })

  return response.json(users)
})

documento.get("/download/:id", async (request, response) => {
  const {includeRelations} = request.query
  const id = request.params.id

  const getDocumentoService = new GetDocumentoService()

  const documento = await getDocumentoService.execute({
    includeRelations: includeRelations === "true",
    id:parseInt(id)
  })

  if(!documento) return response.status(400).json({ error: 'Nenhum documento encontrado' });

  console.log()

  response.download(path.join(root_dir, documento.caminho));

})

documento.put("/", async (request, response) => {
  const {
    id,
    descricao,
    fluxo_id,
    nome,
    nome_arquivo,
    status
  } = request.body

  const updateDocumentoService = new UpdateDocumentoService()

  const updatedDocumento = await updateDocumentoService.execute({
    id,
    descricao,
    fluxo_id,
    nome,
    nome_arquivo,
    status
  })

  return response.json(updatedDocumento)
})


export default documento