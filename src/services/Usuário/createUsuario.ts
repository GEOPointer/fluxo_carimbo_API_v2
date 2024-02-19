import {Usuario} from "@prisma/client"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type CreateUsuarioProps = Omit<Usuario,"id"|"funcao"|"created_at">;

class CreateUsuarioService{
    async execute({nome, sobrenome, assinatura_caminho, email, senha}:CreateUsuarioProps){
        const usuario = await prisma.usuario.create({
            data:{nome, sobrenome, assinatura_caminho, email, senha}
        })
        return usuario
    }
}

export default CreateUsuarioService