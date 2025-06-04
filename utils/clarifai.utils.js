import Clarifai from 'clarifai'
import dotenv from 'dotenv';

dotenv.config();

const clarifaiapp = new Clarifai.App({
    apiKey : process.env.CLARIFAI_API_KEY
})

export async function clarifaiImageHelperModel(foodImage) {
    // this foodImage should be of base 64 image 

    try {
    
        clarifaiapp.models
            .predict(process.env.CLARIFAI_MODEL_AI, { base64: foodImage })
            .then(response => {
                    const foodName = response.outputs[0].data.concepts[0].name;
                    console.log("Recognized food:", foodName);
    
                    if(!foodName){
                        return res.status(400).json({'message':'Issue Occured while finding foodname...'})
                    }
    
                    return foodName;
    
                })
            .catch(err => {
                console.error("Clarifai error:", err);
            });

    } catch (error) {
        console.error('Issue Occured in clarifai function....',error)
        return error;
    }
}

