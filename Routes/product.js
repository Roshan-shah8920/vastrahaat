import express from "express"
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from "../Controller/product.js";

const router = express.Router()

//addProduct
router.post("/add",addProduct)

//getProduct
router.get("/all",getProduct)

//get product by id
router.get("/:id",getProductById)

//update 
router.put("/:id",updateProductById)

//delete
router.delete("/:id",deleteProductById)

export default router;