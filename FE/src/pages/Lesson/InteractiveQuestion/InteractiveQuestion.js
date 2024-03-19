import React, { useEffect, useState } from "react";
import LessonService from "../../../services/LessonService";
import FillBlankQuestion from "../../Quiz/FillBlankQuestion/FillBlankQuestion";
import MultipleChoice from "../../Quiz/MultipleChoice/MultipleChoice";
import MultipleResponse from "../../Quiz/MultipleResponse/MultipleResponse";
import TrueFalseQuestion from "../../Quiz/TrueFalseQuestion/TrueFalseQuestion";
import MatchingQuestion from "../../Quiz/MatchingQuestion/MatchingQuestion";

const InteractiveQuestion = ({ isOpen, quizId, onAnswerCorrect, indexKey }) => {
    const [quizData, setQuizData] = useState(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [isUserInput, setIsUserInput] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quiz = await LessonService.getQuizByQuizId(quizId);
                setQuizData(quiz.data);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        fetchQuizData();
    }, [quizId]);

    const renderQuestion = () => {
        if (!quizData) return null;

        if (quizData.questionType === 'fill_blank') {
            return <FillBlankQuestion
                quizData={quizData.data}
                indexKey={indexKey}
                isCorrectAnswer={handleAnswerInput}
                showCorrectAnswer={isShowAnswer}
                isUserInput={handleUserInput}
            />;
        } else if (quizData.questionType === 'multiple_choice' && quizData.answerType === 'Single') {
            return <MultipleChoice
                exerciseId={1}
                quizData={quizData.data}
                showCorrectAnswer={isShowAnswer}
                indexKey={indexKey}
                isCorrectAnswer={handleAnswerInput}
                isUserInput={handleUserInput}
            />;
        } else if (quizData.questionType === 'multiple_choice' && quizData.answerType === 'Multiple') {
            return <MultipleResponse
                exerciseId={1}
                quizData={quizData.data}
                showCorrectAnswer={isShowAnswer}
                indexKey={indexKey}
                isCorrectAnswer={handleAnswerInput}
                isUserInput={handleUserInput}
            />;
        } else if (quizData.questionType === 'true_false') {
            return <TrueFalseQuestion
                exerciseId={1}
                quizData={quizData.data}
                indexKey={indexKey}
                isCorrectAnswer={handleAnswerInput}
                showCorrectAnswer={isShowAnswer}
                isUserInput={handleUserInput}
            />;
        } else if (quizData.questionType === 'matching') {
            return <MatchingQuestion
                quizData={quizData.data}
                indexKey={indexKey}
                isCorrectAnswer={handleAnswerInput}
                allQuestionsSubmitted={isShowAnswer}
                isUserInput={handleUserInput}
            />;
        } else {
            return null;
        }
    };
    const handleUserInput = (isInput) => {
        setIsUserInput(isInput);
    }

    const handleAnswerInput = (isCorrect) => {
        setIsCorrectAnswer(isCorrect)
    };

    const handleSubmit = () => {
        setIsShowAnswer(true);
        setTimeout(() => {
            if (quizData.questionType === 'matching') {
                onAnswerCorrect(true);
            } else {
                onAnswerCorrect(isCorrectAnswer);
            }

            setIsShowAnswer(false);
            setIsCorrectAnswer(false);
            setIsUserInput(false);
        }, 3000);
    }

    return (
        <section className={`pt-3 overflow-auto d-flex flex-column justify-content-between bg-white`} style={{ minHeight: '80vh', width: '100%' }} >
            <div className="px-5">
                {renderQuestion()}

            </div>
            <div className="bg-white position-sticky bottom-0 px-5 py-2 d-flex align-items-end">
                <button className="btn btn-primary" onClick={handleSubmit} disabled={!isUserInput}>Kiểm tra</button>
            </div>
        </section>
    );
}

export default InteractiveQuestion;