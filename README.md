#### trackbite-backend

A minimal nutition value app ~ track every bite.

## Get started

1. Clone this repo 

    ```bash
        https://github.com/trydevemanish/trackbite-backend.git
    ```

2. Install dependencies

   ```bash
   npm install
   ```
   
3. Create a .env file in root dir and paste these api keys from apprwite, clarifai ai, spoonacular api

   ```bash
        PORT=3000

        CLARIFAI_APP_ID=
        CLARIFAI_USER_ID=
        CLARIFAI_MODEL_AI=food-item-recognition
        CLARIFAI_PAT=
        CLARIFAI_API_KEY=

        APPWRITE_ENDPOINT=
        APPWRITE_PROJECT_ID=
        APPWRITE_DATABASE_ID=
        APPWRITE_MEAL_LOGS_COLLECTION_ID=
        APPWRITE_SECERT_API_KEY=

        SPOONACULAR_API_KEY=
   ```
   
4. Start the app

   ```bash
   npx run dev
   ```

