import express from 'express'
import { calculatePrice } from './pricing'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.post('/reprice',(req,res)=>{
    if(!Array.isArray(req.body)) {
        return res.status(400).json({error:"Body must be array"})
    }
    res.json(req.body.map(calculatePrice))
})

app.listen(3000,()=>console.log('server started'))