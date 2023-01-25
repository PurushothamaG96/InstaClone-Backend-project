const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const postModel = require('../model/postModel')


const fileUpload = require('express-fileupload')
router.use(fileUpload({
    useTempFiles:true
}))

router.get("/posts", async (req, res)=>{
    try{
        const dbdata = await postModel.find().sort({_id:-1})
        res.status(200).json(dbdata)
        
    }catch(e){
        console.log(e.message)
    }
})


router.post("/posts",async (req, res)=>{
    try{
        const {name, description, location} = req.body
        const file = req.files.PostImage.tempFilePath
        await cloudinary.uploader.upload(file, async(err, result)=>{
            
            const date = new Date()
            const data = {
                name,
                description,
                location,
                PostImage:result.url,
                date:`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
            }
            const dbData = await postModel.create(data)
            res.status(201).json({
                message:"Success"
            })
        })
        
    }catch(e){
        console.log(e.message)
    }
    
})

module.exports = router;