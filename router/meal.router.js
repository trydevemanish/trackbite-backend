import { Router } from "express";
import { fetchLatestMeal,fetchMealsLogs,fetchSingleMealDetail,uploadMeal,getFoodItemDetails,uploadThisInDatabase,fetchMoreDatawithAi,fetchMealLogsOfCertainDate } from '../controllers/meal.controllers.js'
const mealrouter = Router() 

//to locate all the meals 
mealrouter.route('/').post(fetchMealsLogs)
//to locate all the meals at a cetain date 
mealrouter.route('/date').post(fetchMealLogsOfCertainDate)
//to locate latest meal 
mealrouter.route('/latest').post(fetchLatestMeal)
//to fetch single meal detail
mealrouter.route('/:id').get(fetchSingleMealDetail)
//to upload the meal to clarifai
mealrouter.route('/upload').post(uploadMeal)
//to get the detail of the actual meal
mealrouter.route('/fooddetail').post(getFoodItemDetails)
//to add to the database 
mealrouter.route('/add').post(uploadThisInDatabase)
// to get some extra data with the ai model 
mealrouter.route('/ask').post(fetchMoreDatawithAi)

export { mealrouter }