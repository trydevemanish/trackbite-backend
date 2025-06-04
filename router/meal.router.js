import { Router } from "express";
import { uploadOnMulter } from "../middleware/multer.middleware.js"
import { fetchLatestMeal,fetchMealsLogs,fetchSingleMealDetail,uploadMeal } from '../controllers/meal.controllers.js'
const mealrouter = Router()

//to locate all the meals 
mealrouter.route('/').get(fetchMealsLogs)
//to locate latest meal 
mealrouter.route('/latest').get(fetchLatestMeal)
//to fetch single meal detail
mealrouter.route('/:id').get(fetchSingleMealDetail)
//to upload the meal 
mealrouter.route('/upload').post(uploadOnMulter.single('mealImage'),uploadMeal)
// mealrouter.route('/upload').post(uploadMeal)

export { mealrouter }