import * as cloudinary from "cloudinary";
import dotenv from "dotenv";
import { writeFileSync } from "fs";
import { ImageStore } from "../types/store-types.js";

dotenv.config({ quiet: true });

const credentials = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};
cloudinary.v2.config(credentials);

export const imageStore: ImageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imageFile: any) {
    writeFileSync("./public/images/temp.img", imageFile);
    const response = await cloudinary.v2.uploader.upload("./public/images/temp.img");
    return {
      url: response.url,
      publicID: response.public_id,
    };
  },

  deleteImage: async function (imgID: string) {
    await cloudinary.v2.uploader.destroy(imgID, {});
  },
};
