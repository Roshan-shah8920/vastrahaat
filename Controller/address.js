import { Address } from "../Model/Address.js";


export const address = async (req,res) => {
    const {fullName, address, city, state, country, pincode, phoneNumber } = req.body;
    const userId = req.user;
    const userAddress = await Address.create({userId,fullName, address, city, state, country, pincode, phoneNumber})
    res.json({message:"Address add ....!",userAddress,success:true})
}

export const getAddress = async (req,res) => {
    const address = await Address.find({userId:req.user}).sort({createdAt:-1})
    res.json({message:"address",userAddress:address[0]})
}


