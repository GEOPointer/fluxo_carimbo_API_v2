import {PrismaClient} from '@prisma/client'
import { Etapa } from '@prisma/client';

const prisma = new PrismaClient()

type CreateStapProps = Omit<Etapa,"id"|"created_at">;

class CreateEtapaService{
    async execute({nome, fluxo_id}:CreateStapProps){
        const fluxo = await prisma.etapa.create({
            data:{nome, fluxo_id}
        })
        return fluxo
    }
}

export default CreateEtapaService