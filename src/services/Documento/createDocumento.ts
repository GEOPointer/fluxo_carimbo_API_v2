import {PrismaClient} from '@prisma/client'
import { Documento } from '@prisma/client';

const prisma = new PrismaClient()

type CreateDocumentoProps = Omit<Documento,"id"|"created_at">;

class CreateDocumentoService{
    async execute({nome, descricao, caminho, status, fluxo_id, nome_arquivo}:CreateDocumentoProps){
        const documento = await prisma.documento.create({
            data:{nome, descricao, caminho, status, fluxo_id, nome_arquivo}
        })
        return documento
    }
}

export default CreateDocumentoService