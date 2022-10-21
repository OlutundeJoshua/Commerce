const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
port = process.env.PORT

const app = require('./index')


mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('connected to Db')
    })
    .catch((err) => console.log(err))


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
      
