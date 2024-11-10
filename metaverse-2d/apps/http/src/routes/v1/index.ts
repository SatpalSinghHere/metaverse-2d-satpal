import { Router } from 'express'
import { userRouter } from './user'
import { adminRouter } from './admin'
import { spaceRouter } from './space'
import { SigninSchema, SignupSchema } from '../../types'
import client from '@repo/db/client'
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from '../../config'
import { compare, hash } from '../../scrypt'

export const router = Router()

router.post('/signup', async(req, res)=>{
    const parsedData = SignupSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({message: 'validation failed'})
        return
    }
    const hashedPassword = await hash(parsedData.data.password, "10")
    try{
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                role: parsedData.data.type === "admin"? "Admin": "User"
            }
        })
        res.json({
            userId : user.id
        })
    }catch(e){
        res.status(400).json({message: 'validation failed'})
    }
    
})

router.post('/signin', async(req, res)=>{
    const parsedData = SigninSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({message: 'validation failed'})
        return
    }
    
    try{
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username
            }
        })
        if(!user){
            res.status(403).json({message: 'Invalid username or password'})
            return
        }
        const isPasswordValid = await compare(parsedData.data.password, user.password)
        if(!isPasswordValid){
            res.status(403).json({message: 'Invalid username or password'})
            return
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, JWT_PASSWORD)
        res.json({
            token : token
        })
    }
    catch(e){
        res.status(400).json({message:"Internal server error"})
    }
})

router.get('/elements')

router.get('/avatars')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/space', spaceRouter)