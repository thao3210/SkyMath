import React, { useState, useEffect } from "react";
import './MultipleChoice.css';

function MultipleChoice({ exerciseId, quizData, indexKey, showCorrectAnswer, isDisable, isCorrectAnswer, isUserInput }) {
  const { question, answer, correctAnswer } = quizData;

  const keyAnswers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (!showCorrectAnswer) {
      setSelectedAnswer(null);
      setIsFormSubmitted(false);
    }
  }, [exerciseId, indexKey, showCorrectAnswer]); // Depend on exerciseId and indexKey

  const handleAnswerSelection = (index) => {
    if (!isFormSubmitted) {
      setSelectedAnswer(index);
      isCorrectAnswer(index === correctAnswer - 1);
      isUserInput(true);
    }
  };

  return (
    <div className="">
      <form className="bg-white shadow-sm rounded-3 py-2 px-3 mb-3">
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
        <div className="ps-1">
          {question?.questionContentType === "text"
            ? <p>{question?.questionContent}</p>
            : <img src={question?.questionContent} alt="Question" className="question-img" />}
        </div>
        <div className="px-3 py-2">
          <div className="d-flex row">
            {answer?.map((option, index) => (
              <div key={option.id} className="col-lg-6 col-md-6 fs-6 pb-2 d-flex gap-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id={`radio-ex${exerciseId}-${option.id}-${indexKey}`}
                  name="radio-stacked"
                  required
                  checked={selectedAnswer === index}
                  onChange={() => handleAnswerSelection(index)}
                  disabled={isDisable}
                />
                <label htmlFor={`radio-ex${exerciseId}-${option.id}-${indexKey}`} className="form-check-label d-flex align-items-start gap-2 opacity-100">
                  <span>{keyAnswers[index]}.</span>
                  {option.answerContentType === "text"
                    ? <span>{option.answerContent}</span>
                    : <img src={option.answerContent} alt={`Answer ${keyAnswers[index]}`} className="answer-img object-fit-contain border rounded" />}
                </label>
              </div>
            ))}
          </div>
        </div>

        {showCorrectAnswer && (
          <div className="mt-3">
            {selectedAnswer === correctAnswer - 1 ? (
              <p className="text-success">Chính xác!</p>
            ) : (
              <p className="text-danger">Không chính xác. Đáp án chính xác là: {keyAnswers[correctAnswer - 1]}.</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default MultipleChoice;
