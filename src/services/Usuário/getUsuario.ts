import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetUsuarioServiceProps = {
  id:string,
}

class GetUsuarioService {
  public async execute(
    { id }: GetUsuarioServiceProps,
  ) {
    const usuario = await prisma.usuario.findFirst({
      include: {
        funcoes:true
      },
      where:{
        id
      }
    })

    return usuario
  }
}

export default GetUsuarioService