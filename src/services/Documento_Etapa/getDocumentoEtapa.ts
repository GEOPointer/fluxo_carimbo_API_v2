import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetDocumentoEtapaServiceProps = {
  documento_id: number
}

class GetDocumentoEtapaService {
  public async execute(
    {documento_id}:GetDocumentoEtapaServiceProps
  ) {
    const documento_etapa = await prisma.documento_Etapa.findMany({
      include:{
        usuario:true
      },
      where: {
        documento_id
      }
    })

    return documento_etapa
  }
}

export default GetDocumentoEtapaService