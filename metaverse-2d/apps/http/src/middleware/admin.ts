import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from '../config'
import { NextFunction, Request, Response } from 'express'

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    const token = header?.split(' ')[1]
    if(!token){
        res.status(401).json({message:"unauthorized"})
        return
    }
    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as {role: string, userId: string}
        if(decoded.role !== 'admin'){
            res.status(401).json({message:"unauthorized"})
            return
        }
    }
    catch(e){
        res.status(401).json({message:"unauthorized"})
        return        
    }
}