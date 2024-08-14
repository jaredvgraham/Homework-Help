"use client";
import React, { useState } from "react";

const Multimedia = ({
  onMultimediaSubmit,
}: {
  onMultimediaSubmit: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = () => {
    onMultimediaSubmit(files);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attach Multimedia</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <ul className="mb-4">
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Multimedia
      </button>
    </div>
  );
};

export default Multimedia;
