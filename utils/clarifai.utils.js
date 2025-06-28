import { grpc,ClarifaiStub } from 'clarifai-nodejs-grpc'
import dotenv from 'dotenv';

dotenv.config();

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_PAT}`);

export async function clarifaiImageHelperModel(foodImage) {
    try {

        const response = await new Promise((resolve, reject) => {
            stub.PostModelOutputs(
                {
                    user_app_id: {
                        "user_id": `${process.env.CLARIFAI_USER_ID}`,
                        "app_id": `${process.env.CLARIFAI_APP_ID}`
                    },
                    model_id: `${process.env.CLARIFAI_MODEL_AI}`,
                    inputs: [
                        {
                            data: {
                                image: {
                                base64: foodImage.replace(/^data:image\/\w+;base64,/, ""), // strip data URL prefix
                                },
                            },
                        },
                    ],
                },
                metadata,
                (err, response) => {

                    if (err) {
                        console.error("Clarifai API Error:", err);
                        reject(err);
                    }

                    if (response.status.code !== 10000) {
                        console.error("Clarifai request failed:", response.status);
                        reject(new Error(`Clarifai request failed: ${response.status.description}`));
                    }

                    const concepts = response.outputs[0].data.concepts;
                    
                    if (!concepts || concepts.length === 0) {
                        reject(new Error("No concepts returned"));
                    }

                    const foodName = concepts[0].name;

                    resolve(foodName);
                }
            )
        })

        console.log("Recognized food name:", response);
        return response;
 
    } catch (error) {
        console.error('Issue Occured in clarifai function....',error)
        return error;
    }
}