//require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';

const app = express();

dotenv.config(
    {
        path: './env'
    }
)

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is start with port ${process.env.PORT}`);
    })
})
.catch( (error) => {
    console.log("MONGODB CONNECTION ERROR", error);
})





/*
( async ()=> {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on("error", (error)=>{
        console.error("Error", error);
        throw error
       })

       app.listen(process.env.PORT, ()=>{
            console.log(`port is listening ${process.env.PORT}`)
       })
    } catch (error) {
        console.error("error", error);
        throw error;
    }
})()

*/