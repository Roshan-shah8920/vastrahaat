import { User } from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



//register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user)
            res.json({ message: "User Alreadly Exist", success: false })
        const hashPass = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashPass })
        res.json({ message: "User Register successfully...!",user, Success: true })
    } catch (error) {

    }
}

//login
export const login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email:email.toLowerCase()})
        if (!user) 
          return  res.json({message:"User Not Find",success:false})
        const validPassword = await bcrypt.compare(password,user.password)
        if (!validPassword) 
            return res.json({message:"Invalid Credential",success:false})

         const token = jwt.sign({userId:user._id},"!@$^&#*()",{
            expiresIn:"365d"
         })

        res.json({message:`welcome ${user.name}`,token,user,success:true})
        
    } catch (error) {
        console.log({message:error.message})
        
    }
}

//all user
export const users = async (req,res) => {
    try {
        const users = await User.find().sort({createdAt:-1}) 
        res.json(users) 
    } catch (error) {
        res.json(error.message)
    }
}


//profile
export const profile = async (req,res) => {
    res.json({user:req.user})
}
