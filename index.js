import express from "express";
import cors from 'cors'
import { mealrouter } from "./router/meal.router.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const PORT = process.env.PORT ?? 4000;

const corsoptions = {
    origin : "http://localhost:8081",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}

//built in middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended:true,limit: '10mb' }))
app.use(cors(corsoptions));

app.get('/',(_req,res) => {
    return res.status(200).json({'message':'All healty'})
})

// router middleware 
app.use('/meal',mealrouter)


app.listen(PORT,() => console.log(`Server Started at port: ${PORT}`))


// 2 - backend api url path error 