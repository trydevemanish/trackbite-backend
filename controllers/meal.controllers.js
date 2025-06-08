import { ID, Query } from 'node-appwrite'
import { databases,config } from '../connection/connection.js'
import { spoonacularRequest } from '../utils/spponacular.utils.js'
import { clarifaiImageHelperModel } from '../utils/clarifai.utils.js'
import { getSimiliarSpoonacularResult } from '../utils/getsimiliarspoonacularreuslt.js'

// fetch latest meal 
export async function fetchLatestMeal(req,res) {
    try {

        const { userid } = await req.body

        const result = await databases.listDocuments(
            config.databaseid,
            config.meal_logs_collectionID,
            [
                Query.equal('userid',userid),
                Query.orderAsc($createdAt),
                Query.list(1)
            ]
        )

        if(!result){
            return res.status(400).json({
                'message':'Result not received from database'
            })
        }

        return res.status(200).json(
            {
                'message':'Meal Logs found',
                'data' : result.documents
            }
        )
        
    } catch (error) {
        return res.status(500).json({
            'message' : 'Issue Occured while fetching data....',
            'error' : error
        })
    }
}

// fetch single meal data 
export async function fetchSingleMealDetail(req,res) {
    try { 

        const url = new URL(req.url)
        const id = url.pathname.split(" ")[3]

        if(!id){
            return res.status(400).json({ 'message':'Meal Log id is required' })
        }

        const result = await databases.getDocument(
            config.databaseid,
            config.meal_logs_collectionID,
            id
        )

        if(!result){
            return res.status(400).json({'message':'No meal with this id.'})
        }
        
    } catch (error) {
        return res.status(500).json({
            'message' : 'Issue Occured while fetching data....',
            'error' : error
        })
    }
}

// fetch all meals 
export async function fetchMealsLogs(req,res) {
    try {

        const { limit,userid } = await res.body

        console.log('Limit to fetch meal logs',limit)

        const buildQuery = [Query.orderDesc('$createdAt')];
        if(limit) buildQuery.push(Query.limit(limit));
        if(!userid){
            return res.status(400).json({'message':'userid is required'})
        }

        buildQuery.push(Query.equal('userid',userid))

        const result = await databases.listDocuments(
            config.databaseid,
            config.meal_logs_collectionID,
            buildQuery
        )

        if(!result){
            return res.status(400).json(
                {'message':'Meals are not avialable'}
            )
        }

        return res.status(200).json({
            'message':'Fetch Meals Logs',
            'data' : result.documents
        })
        
    } catch (error) {
         return res.status(500).json({
            'message' : 'Issue Occured while fetching data....',
            'error' : error
        })
    }
}

// this call is reponsible for food Image Detection from calrifai and giving similiar foodName
export async function uploadMeal(req,res) {
    try {

        const { foodImage } = await req.body

        if(!foodImage){
            return res.status(400).json({
                'message':'Invalid Credentials'
            })
        }

        const foodName = await clarifaiImageHelperModel(foodImage)

        if(!foodName){
            return req.status(400).json(
                {'message': 'food name not found'}
            )
        }

        console.log('foodName given by clarifai',foodName)

        const foodOptions = await getSimiliarSpoonacularResult(foodName)

        return res.status(200).json({
            'message' : 'Fetched foodOptions from image',
            'data' : foodOptions
        })

    } catch (error) {
        return res.status(500).json({
            'message' : 'Issue Occured while Adding data....',
            'error' : error
        })
    }
}

// this call will get the basic foodDetail from the spooncular api
export async function getFoodItemDetails(req,res){
    try {
        const { foodName } = await req.body
    
        if(!foodName){
            return res.status(400).json({'message':'Food Name is required'})
        }
    
        const data = await spoonacularRequest(foodName);
    
        if(!data){
            return res.status(400).json({'message':'Data not avialable.'})
        }
    
        console.log('data from spoonacular',data)
    } catch (error) {
        console.error("Issue Occured in spooncular api: ",error)
        return res.status(500).json({
            'message':'Issue Occured in spooncular api ',
            'error':error
        })
    }

}

// this call will add the data to the database
export async function uploadThisInDatabase(){
    try {
        const { data } = await req.body
    
        if(!data){
            return res.status(400).json({'message':'Food Detail data is required'})
        }
    
        const addData = await databases.createDocument(
            config.databaseid,
            config.meal_logs_collectionID,
            ID.unique(),
            {
                userid : userid,
                foodname : foodName,
                foodImageUrl : foodImage,
                calories : data?.calories?.value,
                protein :data?.protein?.value,
                carbs :data?.value?.value,
                fat : data?.fat?.value
            }
        )
    
        if(!addData) {
            return res.status(400).json({'message':'Failed to add Data'})
        }
    
        return res.status(201).json({
            'message' : 'Data added Successfully...',
            data: data
        })
    } catch (error) {
        console.error("Issue Occured in Adding to DB: ",error)
        return res.status(500).json({
            'message':'Issue Occured in Adding to DB: ',
            'error':error
        })
    }
}

export async function fetchMoreDatawithApi(params) {
    // this will fetch for data with api like how t oburn this calrie and more,
}