# vizsgaremek

## Start the program
To start the codes do the following steps:

#### 1. step
clone the repository
#### 2. step
cd backend \
npm install \
cd .. \
cd frontend \
npm install \
cd ..
#### 3. step
create az .env file at the backend folder with the following data
```
PORT = 3001
GOOGLE_REDIRECT_URI = http://localhost:3000/login

GOOGLE_CLIENT_ID = 
GOOGLE_SECRET = 
MONGO_CONNECTION = 
JWT_SECRET = 
```
#### 4. step
copy the .env file at the root (next to the docker-compose.yaml)
#### 5. step
update the googleSignIn's link at logInOutActions.js with your GOOGLE_CLIENT_ID
#### 6. step
cd frontend \
npm start \
cd .. \
cd backend \
npm start \
cd ..
#### extra steps
there must be added an admin (couple) manually to mongodb in the emaillists collections such as
```
{
  "email":"email@address.com",
  "role":"couple"
}
```


## Run in docker
To start the codes do the following steps:

#### 1. step
download the docker-compose.yaml from https://github.com/CodecoolGlobal/fapi-exam-project-2-general-RekaKR/tree/main
#### 2. step
copy the .env file at the root being given by the developer
#### 2. step
run `docker-compose up -d`
#### extra steps
if you wish to use login and its features ask for permisson from the developer


## Codes I used

### frontend
React: npx create-react-app frontend \
Material-ui: npm install @material-ui/core \
Material-ui styled: npm install @material-ui/styles \
Material-ui icon: npm install @material-ui/icons \
Material-ui lab: npm install @material-ui/lab \
uuid: npm install uuid \
Router: npm install react-router-dom \
npm i jwt-decode \
Email validator: npm install validator

### backend
npm init -y \
npm i express \
npm install cors \
npm install dotenv \
npm install mongoose \
npm install node-fetch \
npm i jsonwebtoken \
npm i swagger-ui-express \
npm install yamljs