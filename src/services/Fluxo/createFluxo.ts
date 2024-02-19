import {Fluxo} from "@prisma/client"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type CreateFlowProps = Omit<Fluxo,"id"|"created_at">;

class CreateFluxoService{
    async execute({nome, descricao}:CreateFlowProps){
        const fluxo = await prisma.fluxo.create({
            data:{nome, descricao}
        })
        return fluxo
    }
}

export default CreateFluxoService