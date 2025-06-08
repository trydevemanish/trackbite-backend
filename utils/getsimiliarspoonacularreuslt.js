import dotenv from 'dotenv';
dotenv.config();

export async function getSimiliarSpoonacularResult(foodName) {
    try {

        const apiKey = process.env.SPOONACULAR_API_KEY;

        const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?number=15&query=${foodName}&apiKey=${apiKey}`)

        if(!response){
            throw new Error('Result not found')
        }

        const foodOptions = await response.json()

        return foodOptions;
        
    } catch (error) {
        throw new Error('Issue Ocuured in spooncaluar api...',error)
    }
}
