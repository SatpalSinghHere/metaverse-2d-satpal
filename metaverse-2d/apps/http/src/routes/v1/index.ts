import { Router } from 'express'
import { userRouter } from './user'
import { adminRouter } from './admin'
import { spaceRouter } from './space'

export const router = Router()

router.get('/signup', (req, res)=>{
    res.json({
        message: 'signup'
    })
})

router.get('/signin', (req, res)=>{
    res.json({
        message: 'signin'
    })
})

router.get('/elements')

router.get('/avatars')

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/space', spaceRouter)