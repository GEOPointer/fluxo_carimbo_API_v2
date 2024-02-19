import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetAllFuncao_EtapaServiceProps = {
  includeRelations: boolean,
  etapa_id?:number,
  funcao_id?:number
}

class GetAllFuncao_EtapaService {
  public async execute(
    { includeRelations, etapa_id, funcao_id }: GetAllFuncao_EtapaServiceProps = { includeRelations: false },
  ) {
    const funcoes_etapas = await prisma.funcao_Etapa.findMany({
      include: {
        etapa: includeRelations,
        funcao: includeRelations
      },
      where:{
        etapa_id,
        funcao_id,
      }
    })

    return funcoes_etapas
  }
}

export default GetAllFuncao_EtapaService