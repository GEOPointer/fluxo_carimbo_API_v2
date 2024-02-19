import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetAllFuncao_UsuarioServiceProps = {
  includeRelations: boolean,
  usuario_id?:string,
  funcao_id?:number
}

class GetAllFuncao_UsuarioService {
  public async execute(
    { includeRelations, usuario_id, funcao_id }: GetAllFuncao_UsuarioServiceProps = { includeRelations: false },
  ) {
    const funcoes_usuarios = await prisma.funcao_Usuario.findMany({
      include: {
        usuario: includeRelations,
        funcao: includeRelations
      },
      where:{
        usuario_id,
        funcao_id
      }
    })

    return funcoes_usuarios
  }
}

export default GetAllFuncao_UsuarioService