import { v2 as cloudinary } from 'cloudinary';

export const handleFileUpload = async (file, resourceType) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUDNAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_APISECRET,
    });

    return await cloudinary.uploader.upload(file, {
        resource_type: resourceType
    });

}

