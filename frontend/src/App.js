import React from 'react';
import { useState, useRef } from "react";
import "./App.css"; 

export default function App() {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };

  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("files", files);
    console.log(formData)

    fetch(
      "/profile", {
      method: "POST",
      body: formData
    }
    )


  };
  if (files) return (
    <div className="uploads">
      <ul>
        {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
      </ul>
      <div className="actions">
        <button onClick={() => setFiles(null)}>Cancel</button>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  )

  return (
    <>
      <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1>Drag and Drop Files to Upload</h1>
        <h1>Or</h1>
        <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select Files</button>
      </div>
    </>
  );

};


