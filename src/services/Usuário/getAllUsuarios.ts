import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class GetAllUsuariosService {
  public async execute() {
    const users = await prisma.usuario.findMany()

    return users
  }
}

export default GetAllUsuariosService