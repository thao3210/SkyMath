import React, { useState, useEffect } from "react";
import './MatchingQuestion.css'

const MatchingQuestion = ({ quizData, indexKey, allQuestionsSubmitted, correctAnswers, isCorrectAnswer, isUserInput }) => {
    const { aSide, bSide } = quizData;
    const [answers, setAnswers] = useState({});
    const [answerMessage, setAnswerMessage] = useState('');
    const [availableOptions, setAvailableOptions] = useState(bSide.map(item => item.content));

    useEffect(() => {
        if (allQuestionsSubmitted) {
            handleSubmit();
        } else {
            setAnswers({});
        }
    }, [allQuestionsSubmitted]);

    const handleDragStart = (e, text) => {
        e.dataTransfer.setData("text/plain", text);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        // isUserInput(true);

        const draggedText = e.dataTransfer.getData("text/plain");

        if (answers[index]) {
            setAvailableOptions((prevOptions) => [...prevOptions, answers[index]]);
        }

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [index]: draggedText,
        }));

        setAvailableOptions((prevOptions) =>
            prevOptions.filter((option) => option !== draggedText)
        );

        const originalBoxIndex = Object.keys(answers).find(
            (key) => answers[key] === draggedText
        );
        if (originalBoxIndex !== undefined) {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [originalBoxIndex]: null,
            }));
        }

        // Check if there are any available options left
        if (availableOptions.length === 1) {
            isUserInput(true);
        } else {
            isUserInput(false);
        }
    };

    const handleReset = (index) => {
        if (answers[index]) {
            const draggedText = answers[index];

            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [index]: null,
            }));

            setAvailableOptions((prevOptions) => [...prevOptions, draggedText]);
        }
    };

    const handleSubmit = () => {
        const allAnswersFilled = Object.values(answers).every((value) => value !== null);

        if (allAnswersFilled) {
            const letterMapping = {}; // Map content to letters
            const reverseLetterMapping = {}; // Map letters to content
            const letterOptions = ['a', 'b', 'c', 'd'];

            bSide.forEach((item, index) => {
                const letter = letterOptions[index];
                letterMapping[item.content] = letter;
                reverseLetterMapping[letter] = item.content;
            });

            const isMatchingCorrect = Object.entries(answers).every(([aId, bContent]) => {
                const aItem = aSide.find((item) => item.id.toString() === aId);
                const bItem = bSide.find((item) => item.content === bContent);
                return aItem && bItem && aItem.id === bItem.id;
            });

            if (isMatchingCorrect) {
                setAnswerMessage("Ghép đôi chính xác!");
                isCorrectAnswer(true);
            } else {
                const correctPairs = aSide
                    .filter((aItem) => {
                        const bItem = bSide.find((item) => item.id === aItem.id);
                        return bItem && aItem.id === bItem.id;
                    })
                    .map((aItem) => `${aItem.id}-${letterMapping[bSide.find((item) => item.id === aItem.id).content]}`);

                setAnswerMessage(`Ghép đôi không chính xác! Đáp án: ${correctPairs.join(', ')}`);
                isCorrectAnswer(false);
            }
        } else {
            setAnswerMessage("Vui lòng điền tất cả các câu trả lời.");
        }
    };


    return (
        <>
            <div className="bg-white shadow-sm rounded-3 py-2 px-3 mb-3">
                <div className="d-flex align-items-start justify-content-between">
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

                <div className="d-flex flex-column gap-3 pt-3">
                    {aSide.map((aItem, index) => (
                        <div className="d-flex gap-3" key={aItem.id}>
                            <div className="border border-2 border-dark rounded w-50 p-3">
                                {aItem.contentType === "text" ? aItem.content : <img src={aItem.content} alt={`Option ${index}`} className="img-matching" />}
                            </div>
                            <div
                                className="border-2 border-secondary-subtle rounded w-50 p-3 answer-drag"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, aItem.id)}
                                onClick={() => handleReset(aItem.id)}
                            >
                                {answers[aItem.id] !== null ? (
                                    bSide.find(item => item.content === answers[aItem.id])?.contentType === "image" ? (
                                        <img src={answers[aItem.id]} alt={`Answer ${index}`} className="img-matching object-fit-contain" />
                                    ) : (
                                        answers[aItem.id]
                                    )
                                ) : (
                                    <span className="text-body-tertiary">Kéo đáp án vào đây</span>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
                <small className="text-danger">*Nhấn vào ô trả lời để xóa câu trả lời</small>

                <h4 className="pt-4 mb-0">Answers</h4>
                <div className="d-flex flex-wrap gap-3 answer-container pt-3">
                    {availableOptions.map((option, index) => (
                        <div
                            key={index}
                            className="border border-dark border-2 rounded px-2 py-1 option"
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, option)}
                        >
                            {bSide.find(item => item.content === option)?.contentType === "image" ? (
                                <img src={option} alt={`Option ${index}`} className="img-matching object-fit-contain" />
                            ) : (
                                option
                            )}
                        </div>
                    ))}
                </div>

                {allQuestionsSubmitted && (
                    <>
                        {answerMessage && (
                            <p>{answerMessage}</p>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default MatchingQuestion;
