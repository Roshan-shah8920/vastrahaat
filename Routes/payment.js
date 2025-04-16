import express from "express"
import { allOrders, checkout, userOrder, verify } from "../Controller/payment.js"
import { Authenticated } from "../Middleware/auth.js";


const router = express.Router()

router.post("/checkout",checkout)

router.post("/verify-payment",verify)  

//user
router.get("/userorder",Authenticated,userOrder)

// all order
router.get("/orders",userOrder)

export default router