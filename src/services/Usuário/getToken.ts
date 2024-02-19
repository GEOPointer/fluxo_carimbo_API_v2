import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type GetTokenProps = {
    token_hash:string,
}

class GetTokenService {
  public async execute({token_hash}:GetTokenProps) {
    const token = await prisma.token.findFirst({
        include:{
          usuario:true
        },
        where:{
            token:token_hash
        }
    })
    return token
  }
}

export default GetTokenService