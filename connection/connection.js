import sdk,{ Databases } from "node-appwrite"

export const client = new sdk.Client();

export const config = {
    platform : 'com.jsm.trackbite',
    endpoint : process.env.APPWRITE_ENDPOINT,
    projectId : process.env.APPWRITE_PROJECT_ID,
    secertApiKey : process.env.APPWRITE_SECERT_API_KEY,
    databaseid : process.env.APPWRITE_DATABASE_ID,
    meal_logs : process.env.APPWRITE_MEAL_LOGS_COLLECTION_ID
}

client
    .setEndpoint(config.endpoint)
    .setPlatform(config.platform)
    .setProject(config.projectId)
    .setKey(config.secertApiKey);

export const databases = new Databases(client);
