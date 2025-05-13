import axios from "axios";
import { API_PATHS, BASE_URL } from "../Utils/apiPaths";

export const useCloudinary = () => {
  return async (blobFile) => {
    console.log();
    console.log(blobFile);

    console.log("Uploading to cloudinary...");

    const cloud_name = "dsble6dtc";
    const formData = new FormData();
    formData.append("file", blobFile);
    formData.append("cloud_name", cloud_name);
    formData.append("upload_preset", "scribly");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    if (res.data?.secure_url) {
      const avatar = {
        cloudinaryUrl: res.data?.secure_url,
        public_id: res.data?.public_id,
      };
      uploadImage(avatar);
    }

    console.log(res);
  };
};

const uploadImage = async (avatar) => {
  try {
    console.log("Uplading in backend...");
    // console.log(avatar);
    

    const { UPLOAD_IMAGE } = API_PATHS.PROFILE;
    const res = await axios.put(BASE_URL + UPLOAD_IMAGE, avatar, {
      withCredentials: true,
    });
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};
