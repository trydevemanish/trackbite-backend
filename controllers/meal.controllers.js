import { Query } from 'node-appwrite'
import { databases,config } from '../connection/connection.js'

// fetch latest meal 
export async function fetchLatestMeal(_req,res) {
    try {

        const result = await databases.listDocuments(
            config.databaseid,
            config.meal_logs_collectionID,
            [
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

export async function fetchMealsLogs(req,res) {
    try {

        const { limit } = await res.body

        console.log('Limit to fetch meal logs',limit)

        const buildQuery = [Query.orderDesc('$createdAt')];
        if(limit) buildQuery.push(Query.limit(limit));

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
