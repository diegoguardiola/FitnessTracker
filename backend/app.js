const { response, json } = require('express');
const express = require('express');
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const profileRouter = require('./routers/profiles')
const workoutRouter = require('./routers/workouts')
const exerciseRouter = require('./routers/excercises')
const userDataRouter = require('./routers/UserData')
const morgan = require('morgan');
const mongoose = require('mongoose');


const cors = require('cors')
app.use(cors())
app.options('*', cors)                       //allow all http request to be passed from any other origin

//Middleware
app.use(express.json())
app.use(morgan('tiny'))             //displays local request



//routers
app.use(`${api}/myprofile`, profileRouter)
app.use(`${api}/myworkouts`, workoutRouter)
app.use(`${api}/myexercises`, exerciseRouter)
app.use(`${api}/userdata`, userDataRouter)


mongoose.connect(process.env.PROFILE_CONNECTION)
.then(() => {
    console.log('data base connection successful')
})
.catch((err) => {
    console.log(err)
})
mongoose.set('strictQuery', false);

app.listen(3000, () => {
    console.log(api);
    console.log('sever running');
})