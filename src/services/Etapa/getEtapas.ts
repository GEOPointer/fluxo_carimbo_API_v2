import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetEtapasServiceProps = {
  includeRelations: boolean,
  fluxo_id:number,
}

class GetEtapasService {
  public async execute(
    { includeRelations, fluxo_id }: GetEtapasServiceProps = { includeRelations: false, fluxo_id:0 },
  ) {
    const flows = await prisma.etapa.findMany({
      include: {
        documentos_etapa: includeRelations,
      },
      where:{
        fluxo_id
      }
    })
    return flows
  }
}

export default GetEtapasService