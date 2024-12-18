import express from "express";
import { router } from "./routes/v1";

import client from "@repo/db/client"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/api/v1", router)

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})