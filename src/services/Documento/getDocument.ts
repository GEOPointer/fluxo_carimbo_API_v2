import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetDocumentoServiceProps = {
  includeRelations: boolean,
  id:number,
}

class GetDocumentoService {
  public async execute(
    { id }: GetDocumentoServiceProps = { includeRelations: false, id: 0 },
  ) {
    const document = await prisma.documento.findFirst({
      include: {
        documentos_etapa: true,
        fluxo:true
      },
      where:{
        id
      }
    })

    return document
  }
}

export default GetDocumentoService