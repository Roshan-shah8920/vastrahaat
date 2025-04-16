import express from "express"
import { createOrder, getAllOrders } from "../Controller/admin.js";


const router = express.Router()

router.post('/order',createOrder);
router.get("/orders", getAllOrders);

export default router;