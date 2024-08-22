import cloudinary from "cloudinary";

cloudinary.config({
     cloud_name: "duvnmnx9e",
     api_key: 538819153594956,
     api_secret: "Y9vRvejzxbIPdTCClN2hXs3RLiU",
});

export const cloudinaryUploadImage = async(fileUpload)=>{
     try {
          const data = await cloudinary.uploader.upload(fileUpload, {
               resource_type: "auto"
          })
          return {
               url : data.secure_url
          }
     } catch (error) {
          return error
     }
}