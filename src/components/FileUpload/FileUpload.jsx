import React, { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    // TODO: Upload file to Cloudinary/Firebase Storage here
    // Call onUpload callback with file info
    onUpload && onUpload(file);
    setFile(null);
    setPreview("");
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleChange} />
      {preview && <img src={preview} alt="preview" style={{ width: 80, marginTop: 10 }} />}
      {file && (
        <button onClick={handleUpload} style={{ marginTop: 10 }}>
          Upload
        </button>
      )}
    </div>
  );
};

export default FileUpload;
