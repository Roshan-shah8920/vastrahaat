import express from "express"
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controller/cart.js";
import { Authenticated } from "../Middleware/auth.js";

const router = express.Router()

router.post ("/add",Authenticated,addToCart)

//specific card
router.get("/user",Authenticated,userCart)

//remove
router.delete("/remove/:productId",Authenticated,removeProductFromCart)

//clear cart
router.delete("/clear",Authenticated,clearCart)

//decreaser Qty
router.post("/--qty",Authenticated,decreaseProductQty)

export default router;