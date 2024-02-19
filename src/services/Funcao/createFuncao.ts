import {Funcao} from "@prisma/client"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type CreateFuncaoProps = Omit<Funcao,"id"|"created_at">;

class CreateFuncaoService{
    async execute({nome}:CreateFuncaoProps){
        const funcao = await prisma.funcao.create({
            data:{nome}
        })
        return funcao
    }
}

export default CreateFuncaoService