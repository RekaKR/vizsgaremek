# vizsgaremek

## Start the program
To start the codes do the following steps:

#### 1. step
clone the repository
#### 2. step
cd backend
npm install
npm start
cd ..
cd frontend
npm install
npm start
cd ..
#### 3. step
create az .env file with the following data
```
PORT = 3001
GOOGLE_REDIRECT_URI = http://localhost:3000/login

GOOGLE_CLIENT_ID = 
GOOGLE_SECRET = 
MONGO_CONNECTION = 
JWT_SECRET = 
```
#### 4. step
update the googleSignIn link at logInOutActions.js with your GOOGLE_CLIENT_ID
#### 5. step
cd frontend
npm start
cd ..
cd backend
npm start
cd ..

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
Email validator: npm install validator \

### backend
npm init -y \
npm i express \
npm install cors \
npm install dotenv \
npm install mongoose \
npm install node-fetch \
npm i jsonwebtoken \
npm i swagger-ui-express \
npm install yamljs \