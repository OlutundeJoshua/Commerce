//packages
const express = require('express')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/auth')

const app = express()

//middleware
app.use(express.json())


//routes

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)


module.exports = app;