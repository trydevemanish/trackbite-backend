import Clarifai from 'clarifai'
import dotenv from 'dotenv';

dotenv.config();

const clarifaiapp = new Clarifai.App({
    apiKey : process.env.CLARIFAI_API_KEY
})

export async function clarifaiImageHelperModel(foodImage) {
    try {

        console.log('clarifai modeleid',process.env.CLARIFAI_MODEL_AI)

        const response  = await clarifaiapp.models.predict(process.env.CLARIFAI_MODEL_AI, { base64: foodImage })

        if(!response){
            throw new Error('Didnot get the response');
        }

        const foodName = response.outputs[0].data.concepts?.[0]?.name;

        if(!foodName){
            throw new Error('Could not recognize food from image');
        }

        console.log('Recognisied food Name',foodName)

        return foodName;

    } catch (error) {
        console.error('Issue Occured in clarifai function....',error)
        return error;
    }
}

