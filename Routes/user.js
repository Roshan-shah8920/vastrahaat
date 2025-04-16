import express from "express"
import { login, profile, register, users } from "../Controller/user.js";
import { Authenticated } from "../Middleware/auth.js";



const router = express()

//register
router.post("/register",register)

//login
router.post("/login",login)

//all user
router.get("/all",users)

//get user profile
router.get("/profile",Authenticated,profile)

export default router;