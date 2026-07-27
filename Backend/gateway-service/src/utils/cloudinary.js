import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadonCloudinary = async (LocalFilePath) => {
    try{
        if(!LocalFilePath) return null
        const result= await cloudinary.uploader.upload(LocalFilePath,{
            resource_type: 'auto',
            
        })
    } catch (error) {
        fs.unlinkSync(LocalFilePath)
    }
}

export { uploadonCloudinary }