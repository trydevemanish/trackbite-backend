import { Router } from "express";
import { fetchLatestMeal,fetchMealsLogs,fetchSingleMealDetail,uploadMeal,getFoodItemDetails,uploadThisInDatabase } from '../controllers/meal.controllers.js'
const mealrouter = Router() 

//to locate all the meals 
mealrouter.route('/').get(fetchMealsLogs)
//to locate latest meal 
mealrouter.route('/latest').get(fetchLatestMeal)
//to fetch single meal detail
mealrouter.route('/:id').get(fetchSingleMealDetail)
//to upload the meal to clarifai
mealrouter.route('/upload').post(uploadMeal)
//to get the detail of the actual meal
mealrouter.route('/fooddetail').post(getFoodItemDetails)
//to add to the database 
mealrouter.route('/add').post(uploadThisInDatabase)

export { mealrouter }