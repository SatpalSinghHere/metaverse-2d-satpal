import { Router } from "express";
import { UpdateMetadataSchema } from "../../types";
import client from '@repo/db/client'
import { userMiddleware } from "../../middleware/user";

export const userRouter = Router()

userRouter.post('/metadata', userMiddleware, async(req, res)=>{
    const parsedData = UpdateMetadataSchema.safeParse(req.body)
    if (!parsedData.success){
        res.status(400).json({message:"Validation failed"})
        return
    }
    await client.user.update({
        where: {
            id: req.userId
        },
        data: {
            avatarId: parsedData.data.avatarId 
        }
    })
})

userRouter.get('/metadata/bulk', async(req, res)=>{
    const str = (req.query.ids ?? "[]") as string
    const userIds = str?.substring(1,str.length-1).split(',')
    
    const metadata = await client.user.findMany({
        where: {
            id: {
                in : userIds
            }
        },
        select: {
            avatar: true,
            id: true
        }        
    })
    res.json({
        avatars: metadata.map((m)=>{
            return {
                userId: m.id,
                avatar: m.avatar?.imageUrl
            }
        })
    })

})