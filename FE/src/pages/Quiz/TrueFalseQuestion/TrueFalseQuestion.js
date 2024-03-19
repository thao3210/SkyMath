import React, { useEffect, useState } from "react";

const TrueFalseQuestion = ({ exerciseId, quizData, indexKey, showCorrectAnswer, correctAnswer, isDisable, isCorrectAnswer, isUserInput }) => {
  const { question, answer } = quizData;

  const [selectedAnswer, setSelectedAnswer] = useState(null);


  useEffect(() => {
    if (!showCorrectAnswer) {
      setSelectedAnswer(null);
    }
  }, [exerciseId, indexKey, showCorrectAnswer]);


  const handleAnswerSelection = (value) => {
    setSelectedAnswer(value);
    const isCorrect = value === answer.toString();
    isCorrectAnswer(isCorrect);
    isUserInput(true);
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
        <div className="ps-1">
          <p>{question.questionContent}</p>
        </div>
        <div className="px-3">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id={`true-${exerciseId}-${indexKey}`}
              name={`trueFalse-${exerciseId}-${indexKey}`}
              value="true"
              checked={selectedAnswer === "true"}
              onChange={() => handleAnswerSelection("true")}
              disabled={isDisable}
            />
            <label htmlFor={`true-${exerciseId}-${indexKey}`} className="form-check-label opacity-100">
              Đúng
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id={`false-${exerciseId}-${indexKey}`}
              name={`trueFalse-${exerciseId}-${indexKey}`}
              value="false"
              checked={selectedAnswer === "false"}
              onChange={() => handleAnswerSelection("false")}
              disabled={isDisable}
            />
            <label htmlFor={`false-${exerciseId}-${indexKey}`} className="form-check-label opacity-100">
              Sai
            </label>
          </div>
        </div>

        {showCorrectAnswer && (
          <div className="mt-3">
            {selectedAnswer === answer.toString() ? (
              <p className="text-success">Chính xác!</p>
            ) : (
              <p className="text-danger">
                Không chính xác. Đáp án chính xác là: {answer.toString()}.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TrueFalseQuestion;
