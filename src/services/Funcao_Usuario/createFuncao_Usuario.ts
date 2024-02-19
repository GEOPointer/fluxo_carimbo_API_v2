import {Funcao_Usuario} from "@prisma/client"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

type CreateFuncao_UsuarioProps = Omit<Funcao_Usuario,"id"|"created_at">;

class CreateFuncao_UsuarioService{
    async execute({usuario_id, funcao_id}:CreateFuncao_UsuarioProps){
        const funcao_usuario = await prisma.funcao_Usuario.create({
            data:{usuario_id, funcao_id}
        })
        return funcao_usuario
    }
}

export default CreateFuncao_UsuarioService