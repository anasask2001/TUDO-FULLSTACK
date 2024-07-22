import { addtudo, deletedata, showalldatas, showdatabyid, updatedata } from "../CONTROLLS/Tudo.js"
import express from "express"

const TudoRoute = express.Router()

TudoRoute.post(`/addtudo`,addtudo)
TudoRoute.put(`/updatetudo/:dataid`,updatedata)
TudoRoute.delete(`/deletetudo/:dataid`,deletedata)
TudoRoute.get(`/showalldatas`,showalldatas)
TudoRoute.get(`/showiddata/:dataid`,showdatabyid)


export default TudoRoute