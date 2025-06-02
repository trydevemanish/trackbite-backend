import express from "express";
import { configDotenv } from "dotenv";
import cors from 'cors'
import { mealrouter } from "./router/meal.router";

configDotenv('./.env')

const app = express()
const PORT = process.env.PORT ?? 4000;

//built in middlewares
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors)


// router middleware 
app.use('/meal',mealrouter)

app.listen(PORT,() => console.log(`Server Started at port: ${PORT}`))