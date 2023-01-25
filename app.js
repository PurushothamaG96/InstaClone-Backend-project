const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 6000;
const postRouter = require('./router/postRouter')
const dotenv = require('dotenv')
dotenv.config()
async function main(){
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("atlas server is connected")
}
main()

const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:process.env.API_SECRET
  });


app.use("/app", postRouter)
app.get("/app", (req, res)=>{
    res.send('ok')
})
app.listen(port, ()=>{
    console.log("server is up at", port)
})