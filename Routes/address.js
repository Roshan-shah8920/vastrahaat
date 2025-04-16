import express from "express"
import { address, getAddress } from "../Controller/address.js";
import { Authenticated } from "../Middleware/auth.js";


const router = express.Router()

router.post("/add",Authenticated,address)

router.get("/get",Authenticated,getAddress)

export default router;