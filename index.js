import express from "express";
import { configDotenv } from "dotenv";
import cors from 'cors'

configDotenv('./.env')

const app = express()
const PORT = process.env.PORT ?? 4000;

//built in middlewares
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors)

app.listen(PORT,() => console.log(`Server Started at port: ${PORT}`))