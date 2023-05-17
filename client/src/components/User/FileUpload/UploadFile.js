import React, { useState } from 'react';
import classes from './UploadFile.module.css';
function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append('file', file);

    fetch('https://api.anonfiles.com/upload/?token=e06e21f2fd9143f4', {
      method: 'POST',
      body: file,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        alert('File uploaded successfully');
      })
      .catch((error) => {
        console.error('Failed to upload file:', error);
        alert('Failed to upload file');
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          className={classes.input}
          type="file"
          onChange={handleFileChange}
        />
        <button className={classes.input} type="submit" disabled={!file}>
          Upload image
        </button>
      </form>
      {previewUrl && (
        <>
          <a href={file} download={fileName}>
            <img className="imgPreview" src={previewUrl} alt="Preview" />
          </a>
        </>
      )}
    </div>
  );
}

export default UploadFile;
