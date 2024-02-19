import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetAllFuncaoServiceProps = {
  includeRelations: boolean,
}

class GetAllFuncaoService {
  public async execute(
    { includeRelations }: GetAllFuncaoServiceProps = { includeRelations: false },
  ) {
    const funcoes = await prisma.funcao.findMany({
      include: {
        etapas: includeRelations,
      },
    })

    return funcoes
  }
}

export default GetAllFuncaoService