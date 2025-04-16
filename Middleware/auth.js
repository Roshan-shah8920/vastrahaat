import jwt from "jsonwebtoken";
import { User } from "../Model/User.js"


export const Authenticated = async (req,res,next) => {
    const token = req.header("Auth")
    if (!token) return res.json({message:"Login First"})

        const decode = jwt.verify(token,"!@$^&#*()")
        // console.log(decode);

        let id = decode.userId

        let user = await User.findById(id)
        if (!user) return res.json({message:"User not exist"})
            req.user = user;
        next();      
        
}

