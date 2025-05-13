const cloudinary = require("cloudinary").v2;

exports.deleteCloudinaryImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted:", result);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};
