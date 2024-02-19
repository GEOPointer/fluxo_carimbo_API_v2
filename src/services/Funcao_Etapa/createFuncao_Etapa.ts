import {Funcao_Etapa} from "@prisma/client"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type CreateFuncao_EtapaProps = Omit<Funcao_Etapa,"id"|"created_at">;

class CreateFuncao_EtapaService{
    async execute({etapa_id, funcao_id}:CreateFuncao_EtapaProps){
        const funcao_etapa = await prisma.funcao_Etapa.create({
            data:{etapa_id, funcao_id}
        })
        return funcao_etapa
    }
}

export default CreateFuncao_EtapaService