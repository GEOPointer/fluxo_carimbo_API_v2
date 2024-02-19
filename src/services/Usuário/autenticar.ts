import {Usuario} from "@prisma/client"
import {PrismaClient} from '@prisma/client'

import { sign } from "jsonwebtoken"

import { checkPassword } from "../../utils/bcryptjs"

import AppError from "../../errors/AppError"

const prisma = new PrismaClient()

type Request = {
  email: string
  password: string
}

type Response = {
  user: Omit<Usuario, "id"|"created_at"|"senha">
  token: string
}

class AutenticarService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userExist = await prisma.usuario.findFirst({
      where: {
        email
      }
    })
    
    if (!userExist) {
      throw new AppError("Email não encontrado")
    }

    const passwordMatched = await checkPassword({
      password:password,
      password_hash: userExist.senha,
    })

    if (!passwordMatched) {
      throw new AppError("Credenciais incorretas")
    }

    const tokenExist = await prisma.token.findMany({
      where: {
        usuario_id: userExist.id,
      },
    })

    if (tokenExist.length >= 1) {
      await prisma.token.delete({
        where: {
          id: tokenExist[0].id,
        },
      })
    }

    const token = await prisma.token.create({
      data: {
        token: sign({}, "GEOPOINTER", {
          subject: userExist.id.toString(),
          expiresIn: "1d",
        }),
        usuario_id: userExist.id,
      },
    })

    const {senha, created_at, ...rest } = userExist

    return {
      user: {
        ...rest,
      },
      token: token.token,
    }
  }
}

export default AutenticarService