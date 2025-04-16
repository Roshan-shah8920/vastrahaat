import express from "express"
const app = express()
import mongoose from "mongoose"
import userRoute from "./Routes/user.js"
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import cors from "cors"
import paymentRouter from "./Routes/payment.js"
import adminRoutes from './Routes/admin.js'; 

const port = 5000

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(express.json());

//user Route
app.use("/api/user",userRoute)

//product Route
app.use("/api/product",productRouter)

//cart
app.use("/api/cart",cartRouter)

//add
app.use("/api/address",addressRouter)

// app.use("/api/admin",adminRouter)
//payment
app.use("/api/payment",paymentRouter)


app.use('/api/admin',adminRoutes);

//mongodb.connect
mongoose.connect("mongodb+srv://rs20150190128:9iPPwsMvRnsno5KY@cluster0.uma1rih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    dbName:"project44"
}).then(()=>console.log("MongoDb Connected Succssfylly..!")).catch(()=>console.log(error))
 
//home route 
app.get("/",(req,res)=>res.json({message:"This is home route"}))

app.listen(port,()=>console.log(`server is running on port ${port}`))



//rs20150190128
// 9iPPwsMvRnsno5KY