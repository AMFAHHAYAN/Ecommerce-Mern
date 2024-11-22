import jwt from "jsonwebtoken"
import { MESSAGES,HTTP_CODES } from "../config/constants";


export const verifyToken = (req,res,next) => {
    const token = req.header["authorization"];
    
    if(!token){
        return res.status(HTTP_CODES.FORBIDDEN).json({
            message : MESSAGES.TOKEN.TOKEN_NOT_PROVIDED
        })
    }

    try {
        const verifiedToken = jwt.verify(token,"KEY")
        if(verifiedToken){
            next()
        }
    } catch (error) {
        console.log(error.message)
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message })
        
    }
}