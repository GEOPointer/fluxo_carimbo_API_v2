import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetAllDocumentosServiceProps = {
  includeRelations: boolean,
  status?:string,
}

class GetAllDocumentosService {
  public async execute(
    { includeRelations, status }: GetAllDocumentosServiceProps = { includeRelations: false },
  ) {
    const flows = await prisma.documento.findMany({
      include: {
        documentos_etapa: includeRelations,
      },
      where:{
        status
      }
    })

    return flows
  }
}

export default GetAllDocumentosService