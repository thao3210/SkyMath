import React, { useEffect, useState } from "react";

const FillBlankQuestion = ({ quizData, indexKey, showCorrectAnswer, isDisable, isCorrectAnswer, isUserInput }) => {
    const { question, answer } = quizData;
    const [userInput, setUserInput] = useState({});
    const [isCorrect, setIsCorrect] = useState({});

    // Reset input fields when showCorrectAnswer changes
    useEffect(() => {
        if (!showCorrectAnswer) {
            setUserInput({});
            setIsCorrect({});
        }
    }, [showCorrectAnswer]);

    useEffect(() => {
        const allCorrect = Object.values(isCorrect).every((correct) => correct);
        if (allCorrect) {
            isCorrectAnswer(true);
        }
    }, [isCorrect, isCorrectAnswer]);

    const handleInputChange = (blankId, value) => {
        setUserInput((prevInput) => ({
            ...prevInput,
            [blankId]: value,
        }));

        // Check if the input value is empty
        const isEmpty = value.trim() === '';

        // Update isUserInput state based on whether the input is empty or not
        isUserInput(!isEmpty);


        // Dynamically check correctness as user types
        const isMatchingCorrect = value.toLowerCase().trim() === answer[blankId].toLowerCase().trim();
        setIsCorrect((prevCorrect) => ({
            ...prevCorrect,
            [blankId]: isMatchingCorrect,
        }));
    };

    const renderQuestion = () => {
        const parts = question.split(/<input>/g);
        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index !== parts.length - 1 && (
                    <input
                        className={`border-1 rounded mx-2 px-2 py-1 ${showCorrectAnswer && !isCorrect[`blank${index + 1}`] ? "border-danger" : ""}`}
                        value={userInput[`blank${index + 1}`] || ""}
                        onChange={(e) => handleInputChange(`blank${index + 1}`, e.target.value)}
                        disabled={isDisable}
                    />
                )}
            </React.Fragment>
        ));
    };

    return (
        <>
            <div className="bg-white shadow-sm rounded-3 py-2 px-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fw-bold fs-5 mb-2">Câu {indexKey + 1}:</p>
                    <label className="ui-bookmark">
                        <input type="checkbox" />
                        <div className="bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
                            </svg>
                        </div>
                    </label>
                </div>
                <div className="pt-2" style={{ textAlign: "justify" }}>
                    {renderQuestion()}
                </div>

                {showCorrectAnswer && (
                    <div className="mt-4">
                        {Object.keys(answer).map((blankId, index) => (
                            <p key={index} className={isCorrect[blankId] ? "text-success mb-1" : "text-danger mb-1"}>
                                {isCorrect[blankId]
                                    ? `Ô trống ${index + 1}: Chính xác!`
                                    : `Ô trống ${index + 1}: Không chính xác. Đáp án: ${answer[blankId]}`}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default FillBlankQuestion;
