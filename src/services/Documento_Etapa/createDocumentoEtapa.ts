import {PrismaClient} from '@prisma/client'
import { Documento_Etapa } from '@prisma/client';

const prisma = new PrismaClient()

type CreateDocumentoEtapaProps = Omit<Documento_Etapa,"id"|"created_at"|"updated_at">;

class CreateDocumentoEtapaService{
    async execute({etapa_id, documento_id, usuario_id}:CreateDocumentoEtapaProps){
        const documento_etapa = await prisma.documento_Etapa.create({
            data:{etapa_id, documento_id, usuario_id}
        })
        return documento_etapa
    }
}

export default CreateDocumentoEtapaService