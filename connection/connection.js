import { Databases,Client } from "node-appwrite"
import dotenv from 'dotenv';

dotenv.config()

export const client = new Client();

export const config = {
    platform : 'com.jsm.trackbite',
    endpoint : process.env.APPWRITE_ENDPOINT,
    projectId : process.env.APPWRITE_PROJECT_ID,
    secertApiKey : process.env.APPWRITE_SECERT_API_KEY,
    databaseid : process.env.APPWRITE_DATABASE_ID,
    meal_logs_collectionID : process.env.APPWRITE_MEAL_LOGS_COLLECTION_ID
}

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.secertApiKey);

export const databases = new Databases(client);