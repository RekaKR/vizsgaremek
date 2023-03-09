# "Masterpiece of exam" || Vizsgaremek
It is my "final masterpiece" at the FS Api class; a MERN-stack (full-stack) webapplication made with React & Node.js.

## Start the program
### Start the program with vsc
To start the codes do the following steps:

#### 1. step
clone the repository and open with vsc

#### 2. step
at the terminal:
```
cd backend
npm install
cd ..
cd frontend
npm install
cd ..
```

#### 3. step
create the .env file at the backend folder with the following data
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
```
cd frontend
npm start
cd ..
cd backend
npm start
cd ..
```

#### extra steps
there must be added an admin (couple) manually to mongodb in the emaillists collections such as
```
{
  "email":"email@address.com",
  "role":"couple"
}
```

### Run in docker
To start the codes do the following steps:

#### 1. step
download the docker-compose.yaml from https://github.com/RekaKR/vizsgaremek

#### 2. step
copy the .env file at the root being given by the developer

#### 2. step
run `docker-compose up -d`

#### extra steps
if you wish to use login and its features ask for permisson from the developer


## Main technologies I used
React (w JavaScript ES6, react-router, basic & custom Hooks) \
Node.js (w express) \
MongoDB (w mongoose) \
Sass, material-UI \
Jest (w mongodb-memory-server, supertest & mocked data) \
Docker (w pipeline & docker-compose) \
Swagger (w yaml)


## Codes I used
### At frontend
React: npx create-react-app frontend \
Material-ui: npm install @material-ui/core \
Material-ui styled: npm install @material-ui/styles \
Material-ui icon: npm install @material-ui/icons \
Material-ui lab: npm install @material-ui/lab \
uuid: npm install uuid \
Router: npm install react-router-dom \
npm i jwt-decode \
Email validator: npm install validator

### At backend
npm init -y \
npm i express \
npm install cors \
npm install dotenv \
npm install mongoose \
npm install node-fetch \
npm i jsonwebtoken \
npm i swagger-ui-express \
npm install yamljs


## License
### Commons Clause
Read more about here: https://commonsclause.com
