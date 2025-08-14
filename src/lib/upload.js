// Cloudinary upload function
const upload = async (file) => {
  const cloudName = "dc92vz2t1"; // Your Cloudinary cloud name
  const uploadPreset = "upload_image"; // Your unsigned preset name

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  console.log("Uploading to Cloudinary...");
  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("Cloudinary response status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Cloudinary response data:", data);
      if (data.secure_url) {
        console.log("Cloudinary upload success:", data.secure_url);
        return data.secure_url;
      } else {
        console.error("Cloudinary upload failed", data);
        throw new Error("Cloudinary upload failed");
      }
    });
};

export default upload;
