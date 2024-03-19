import React, { useState } from "react";
import './FileUploadQuestion.css';

const FileUploadQuestion = () => {
    const [highlighted, setHighlighted] = useState(false);
    const [files, setFiles] = useState([]);

    const highlight = () => {
        setHighlighted(true);
    };

    const unhighlight = () => {
        setHighlighted(false);
    };

    const handleDrop = (e) => {
        const dt = e.dataTransfer;
        const newFiles = [...dt.files];
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileInputChange = (e) => {
        const newFiles = [...e.target.files];
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    return (
        <>
            <div className="container py-5">
                <div>
                    <h3>Question 1: File upload question</h3>
                </div>
                <div className="pt-3">
                    <h4>Your answer</h4>
                    <div
                        onDragEnter={highlight}
                        onDragOver={highlight}
                        onDragLeave={unhighlight}
                        onDrop={(e) => {
                            unhighlight();
                            handleDrop(e);
                        }}
                        className="d-lg-flex gap-3"
                    >
                        <div className="col">
                            <label
                                htmlFor="file-input"
                                className="w-100 py-5 border-dashed border-2 border-secondary-subtle rounded text-center text-body-tertiary "
                            >
                                Drag & Drop files here or click to select
                            </label>
                            <input
                                type="file"
                                id="file-input"
                                multiple
                                onChange={handleFileInputChange}
                                className="d-none"
                            />
                        </div>
                        <div className="col">
                            <ul className="list-unstyled small">
                                {files.map((file, index) => (
                                    <li className="d-flex align-items-center pb-2">
                                        <button
                                            className="bg-white border-1 border-danger rounded-1 text-danger me-2"
                                            onClick={() => removeFile(index)}
                                        >
                                            <i className="fa-solid fa-x small"></i>
                                        </button>
                                        <span key={index}>
                                            {file.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <button className="btn btn-outline-success mt-3">Submit</button>
            </div>
        </>
    );
}

export default FileUploadQuestion;
