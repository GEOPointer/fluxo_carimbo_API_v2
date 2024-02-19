import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetAllFlowsServiceProps = {
  includeRelations: boolean,
}

class GetAllFluxosService {
  public async execute(
    { includeRelations }: GetAllFlowsServiceProps = { includeRelations: false },
  ) {
    const flows = await prisma.fluxo.findMany({
      include: {
        etapas: includeRelations,
      },
    })

    return flows
  }
}

export default GetAllFluxosService