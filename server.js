import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()


mongoose.connect(process.env.CON_STRING)
    .then(() => {
        console.log("Connected to the Database!")
        app.listen(3000, ()=>{
            console.log("Server is running on port 3000")
        })
    })
    .catch(() => {
        console.log("Connection unsuccessful")
    });

app.get('/', (req, res) => {
    res.send("Hello from NodeJS server API");
})