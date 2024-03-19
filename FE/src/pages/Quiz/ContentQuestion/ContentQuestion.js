import React, { useState } from "react";
import './ContentQuestion.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ContentQuestion = () => {
    const [value, setValue] = useState('');

    const handleQuillChange = (content) => {
        console.log('Text changed:', content);
        setValue(content);
    };

    const modules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"],
                ["link", "image", "video"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
            ],
        }
    }


    return (
        <>
            <div className="container py-5">
                <h3>Question 1: Content question</h3>
                <div className="d-block pt-3">
                    <h4>Your answer</h4>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={handleQuillChange}
                        modules={modules}
                    />
                </div>
                <button className="btn btn-outline-success mt-3">Submit</button>
            </div>
        </>
    );
}

export default ContentQuestion;
