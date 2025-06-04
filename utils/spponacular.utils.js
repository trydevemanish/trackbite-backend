import dotenv from 'dotenv';
dotenv.config();

export async function spoonacularRequest(foodName) {
    try {

        const apiKey = process.env.SPOONACULAR_API_KEY;

        const response = await fetch(`https://api.spoonacular.com/recipes/guessNutrition?title=${foodName}&number=1&apiKey=${apiKey}`)

        if(!response){
            throw new Error('Result not found')
        }

        const data = await response.json()

        return data;
        
    } catch (error) {
        throw new Error('Issue Ocuured in spooncaluar api...',error)
    }
}


// export async function fatSecretAccessToken() {
//     const accesstoken = await fetch(`https://oauth.fatsecret.com/connect/token`)


// }