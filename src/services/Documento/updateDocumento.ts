import { Documento } from "@prisma/client"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type Request = Omit<Documento, "created_at" | "caminho">

class UpdateDocumentoService {
  public async execute({
    id,
    descricao,
    fluxo_id,
    nome,
    nome_arquivo,
    status
  }: Request): Promise<Documento> {

    const documento = await prisma.documento.update({
      where: {
        id,
      },
      data: {
        descricao,
        fluxo_id,
        nome,
        nome_arquivo,
        status
      },
    })

    return documento
  }
}

export default UpdateDocumentoService