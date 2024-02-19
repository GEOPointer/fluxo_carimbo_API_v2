import CreateUsuarioService from "./services/Usuário/createUsuario";
import CreateFluxoService from "./services/Fluxo/createFluxo";
import { hash } from "./utils/bcryptjs";
import CreateFuncaoService from "./services/Funcao/createFuncao";
import CreateFuncao_UsuarioService from "./services/Funcao_Usuario/createFuncao_Usuario";
import CreateEtapaService from "./services/Etapa/createEtapa";
import CreateFuncao_EtapaService from "./services/Funcao_Etapa/createFuncao_Etapa";

async function main(){

    const create_usuario = new CreateUsuarioService()
    const senha_hash = await hash({password:"gpr@12345"})
    const {id:usuario_id} = await create_usuario.execute({
        nome:"Felipe",
        sobrenome:"Costa Tavares",
        email:"felipecostatavares@gmail.com",
        assinatura_caminho:"storage\\signatures\\1699547042265_felipe_costa_tavares_signature.png",
        senha:senha_hash
    })

    const create_funcao = new CreateFuncaoService()
    const {id:funcao_administrador_id} = await create_funcao.execute({nome:"Administrador"})
    const {id:funcao_aprovador_id} = await create_funcao.execute({nome:"Aprovador"})
    const {id:funcao_verificador_asbuilt_id} = await create_funcao.execute({nome:"Verificador As-Built"})
    const {id:funcao_verificador_sppid_id} = await create_funcao.execute({nome:"Verificador SPPID"})
    const {id:funcao_modelador_id} = await create_funcao.execute({nome:"Modelador As-Built"})

    const create_funcao_ususario = new CreateFuncao_UsuarioService()
    create_funcao_ususario.execute({
        usuario_id:usuario_id,
        funcao_id:funcao_administrador_id
    })

    const create_fluxo = new CreateFluxoService()
    const {id:fluxo_id} = await create_fluxo.execute({
        nome:"BRASKEM",
        descricao:"Fluxo de assinaturas de PDF para a BRASKEM"
    })
    
    const create_etapa = new CreateEtapaService()
    const {id:etapa_redesenho_id} = await create_etapa.execute({
        nome:"Verificação Redesenho",
        fluxo_id
    })
    const {id:etapa_marcacao_id} = await create_etapa.execute({
        nome:"Marcação FX (As-Built)",
        fluxo_id
    })
    const {id:etapa_verificar_tubulacao_id} = await create_etapa.execute({
        nome:"Verificação Marcação FX - Tubulação",
        fluxo_id
    })
    const {id:etapa_verificar_processo_id} = await create_etapa.execute({
        nome:"Verificação Marcação FX - Processo",
        fluxo_id
    })
    const {id:etapa_verificar_fixacao_id} = await create_etapa.execute({
        nome:"Verificação Fixação FX",
        fluxo_id
    })
    const {id:etapa_aprovacao_id} = await create_etapa.execute({
        nome:"Aprovação Final FX As-Built",
        fluxo_id
    })

    const create_funcao_etapa = new CreateFuncao_EtapaService()
    await create_funcao_etapa.execute({
        etapa_id:etapa_redesenho_id,
        funcao_id:funcao_verificador_sppid_id
    })
    await create_funcao_etapa.execute({
        etapa_id:etapa_marcacao_id,
        funcao_id:funcao_modelador_id
    })
    await create_funcao_etapa.execute({
        etapa_id:etapa_verificar_tubulacao_id,
        funcao_id:funcao_verificador_asbuilt_id
    })
    await create_funcao_etapa.execute({
        etapa_id:etapa_verificar_processo_id,
        funcao_id:funcao_verificador_sppid_id
    })
    await create_funcao_etapa.execute({
        etapa_id:etapa_verificar_fixacao_id,
        funcao_id:funcao_verificador_sppid_id
    })
    await create_funcao_etapa.execute({
        etapa_id:etapa_aprovacao_id,
        funcao_id:funcao_aprovador_id
    })
}

main()