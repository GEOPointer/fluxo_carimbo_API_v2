import { Router } from "express"
import usuario from "./usuario"
import auth from "./auth"
import fluxo from "./fluxo"
import etapa from "./etapa"
import documento from "./documento"
import documento_etapa from "./documento_etapa"
import funcao from "./funcao"
import funcao_usuario from "./funcao_usuario"
import funcao_etapa from "./funcao_etapa"

const routes = Router()

routes.use("/usuario", usuario)
routes.use("/auth", auth)
routes.use("/fluxo", fluxo)
routes.use("/funcao", funcao)
routes.use("/funcao_usuario", funcao_usuario)
routes.use("/funcao_etapa", funcao_etapa)
routes.use("/etapa", etapa)
routes.use("/documento", documento)
routes.use("/documento_etapa", documento_etapa)

export default routes