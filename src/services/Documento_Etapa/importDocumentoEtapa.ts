import {PrismaClient} from '@prisma/client'
import { Documento_Etapa } from '@prisma/client';

const prisma = new PrismaClient()

type ImportDocumentoEtapaProps = Omit<Documento_Etapa,"id">;

class ImportDocumentoEtapaService{
    async execute({etapa_id, documento_id, usuario_id, created_at, updated_at}:ImportDocumentoEtapaProps){
        const documento_etapa = await prisma.documento_Etapa.create({
            data:{etapa_id, documento_id, usuario_id, created_at, updated_at}
        })
        return documento_etapa
    }
}

export default ImportDocumentoEtapaService