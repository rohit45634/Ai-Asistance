import React from "react";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const uploadCloudinary = async (filepath) => {
  //configuration cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);
    await fs.unlink(filepath);
    return uploadResult.secure_url;
  } catch (error) {}
};

export default uploadCloudinary;
