import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TestService from "../../../services/TestService";
import MultipleChoice from "../../Quiz/MultipleChoice/MultipleChoice";
import MatchingQuestion from "../../Quiz/MatchingQuestion/MatchingQuestion";
import FillBlankQuestion from "../../Quiz/FillBlankQuestion/FillBlankQuestion";
import TrueFalseQuestion from "../../Quiz/TrueFalseQuestion/TrueFalseQuestion";
import './ExamDetails.css';
import MultipleResponse from "../../Quiz/MultipleResponse/MultipleResponse";

const ExamDetails = () => {
    const { id } = useParams();
    const [testDetailData, setTestDetailData] = useState(null);
    const [exerciseQuizList, setExerciseQuizList] = useState([]);
    const [tests, setTests] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [quizType, setQuizType] = useState([]);
    const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null));
    const [allQuestionsSubmitted, setAllQuestionsSubmitted] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false); // New state variable
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [examStarted, setExamStarted] = useState(false); // Track if exam has started
    const [remainingTime, setRemainingTime] = useState(null); // Remaining time in seconds

    useEffect(() => {
        const fetchTestDetailData = async () => {
            try {
                const result = await TestService.getTestDetailByID(id);

                if (result.status === 200) {
                    setTestDetailData(result.data);

                    const exerciseQuizListData = result.data?.content || [];

                    setExerciseQuizList(Object.values(exerciseQuizListData));

                    const quizDataArray = Object.values(exerciseQuizListData).map(quiz => quiz.data);
                    const quizTypeArray = Object.values(exerciseQuizListData).map(quiz => quiz.questionType);

                    setQuizData(quizDataArray);
                    setQuizType(quizTypeArray);


                } else {
                    console.error("Error courses result status", result.status);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchTestDetailData();
    }, [id]);

    useEffect(() => {
        const fetchTestsData = async () => {
            try {
                const indexPage = 1;
                const year = 0;
                const subject = 0;
                const grade = 0;
                const province = 0;
                const response = await TestService.getTests(indexPage, year, subject, grade, province);
                setTests(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTestsData();
    }, []);


    const handleAnswerSelected = (questionIndex, selectedAnswer) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[questionIndex] = selectedAnswer;
        setUserAnswers(updatedUserAnswers);
    };


    const handleSubmitAllQuiz = useCallback(() => {
        if (userAnswers.every((answer) => answer !== null)) {
            setAllQuestionsSubmitted(true);
            setIsSubmitted(true);

            const correctAnswersArray = quizData.map((quiz, index) => {
                if (quiz.questionType === "multiple_choice") {
                    if (quiz.answerType === "Single") {
                        return quiz.correctAnswer - 1;
                    } else if (quiz.answerType === "Multiple") {
                        return quiz.correctAnswer.split(",").map((item) => parseInt(item, 10) - 1);
                    }
                } else if (quiz.questionType === "fill_blank") {
                    return quiz.answer.correctAnswers;
                } else if (quiz.questionType === "matching") {
                    return quiz.answer.bSide.map((item) => item.id);
                } else if (quiz.questionType === "true_false") {
                    return quiz.answer.toString();
                }
                return null;
            });

            setCorrectAnswers(correctAnswersArray);
            setShowCorrectAnswers(true);
            setExamStarted(false);
        } else {
            console.log("Please answer all questions before submitting.");
        }
    }, [userAnswers, quizData]);


    const resetShowAnswers = () => {
        setShowCorrectAnswers(false);
        setExamStarted(false);
    }


    useEffect(() => {
        let timer;

        if (examStarted && remainingTime !== null && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime === 30) {
                        // Trigger alert when 30 seconds left
                        // alert("Only 30 seconds left!");
                    }

                    // Check if time is over and automatically submit
                    if (prevTime === 1) {
                        // alert("Time is over. Auto-submitting now!");
                        handleSubmitAllQuiz();
                        clearInterval(timer); // Stop the timer
                        return 0; // Set remaining time to 0 after auto-submit
                    }

                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [examStarted, remainingTime, handleSubmitAllQuiz]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(remainingMinutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const handleStartExam = () => {
        setShowCorrectAnswers(false);
        setExamStarted(true);
        setRemainingTime(testDetailData?.timeLimit * 60); // Convert minutes to seconds
    };

    return (
        <section className={`bg-noflash ${examStarted && remainingTime <= 5 && remainingTime !== 0 ? 'flashRed' : ''}`}>
            <div className="container">
                <div className="py-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb fs-6">
                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                            <li className="breadcrumb-item"><Link to="/Exams">Đề thi</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{testDetailData?.name}</li>
                        </ol>
                    </nav>
                    <h2 className='text-uppercase fw-bold'>{testDetailData?.name}</h2>
                    <div className='d-flex flex-wrap align-items-center justify-content-between fs-6'>
                        <div className='d-flex flex-wrap align-items-center mt-2'>
                            <div className='small pe-4'>
                                <i className="small p-2 fa-solid fa-graduation-cap m-0"></i>
                                <span>{testDetailData?.grade}</span>
                            </div>
                            <div className='small pe-4'>
                                <i className="small p-2 fa-solid fa-calendar-check m-0"></i>
                                <span>{testDetailData?.year}</span>
                            </div>
                            <div className='small pe-4'>
                                <i className="small p-2 fa-solid fa-location-dot m-0"></i>
                                <span>{testDetailData?.province}</span>
                            </div>
                            <div className='small pe-4'>
                                <i className="small p-2 fa-solid fa-clock m-0"></i>
                                <span>{testDetailData?.timeLimit} phút</span>
                            </div>
                        </div>

                        {examStarted && (
                            <div>
                                <span className="h3 border border-2 rounded px-3 py-2 bg-white">{formatTime(remainingTime)}</span>
                            </div>
                        )}

                        {!examStarted && (
                            <button onClick={handleStartExam} className="btn btn-primary  my-3">
                                Bắt đầu
                            </button>
                        )}
                    </div>



                    <p className="fw-bold fs-5">Danh sách câu hỏi</p>

                    {exerciseQuizList.map((quiz, index) => (
                        <div key={index} className="pb-3">
                            {quiz.questionType === 'multiple_choice' && quiz.answerType === 'Single' && (
                                <MultipleChoice
                                    exerciseId={id}
                                    quizData={quiz.data}
                                    indexKey={index}
                                    onAnswerSelected={(selectedAnswer) => handleAnswerSelected(index, selectedAnswer)}
                                    showCorrectAnswer={showCorrectAnswers}
                                    correctAnswer={isSubmitted ? correctAnswers[index] : null}
                                    isDisable={!examStarted}
                                    isCorrectAnswer={() => { }}
                                    isUserInput={() => { }}
                                />
                            )}
                            {quiz.questionType === 'multiple_choice' && quiz.answerType === 'Multiple' && (
                                <MultipleResponse
                                    exerciseId={id}
                                    quizData={quiz.data}
                                    indexKey={index}
                                    onAnswerSelected={(selectedAnswer) => handleAnswerSelected(index, selectedAnswer)}
                                    showCorrectAnswer={showCorrectAnswers}
                                    correctAnswer={isSubmitted ? correctAnswers[index] : null}
                                    isDisable={!examStarted}
                                    isCorrectAnswer={() => { }}
                                    isUserInput={() => { }}
                                />
                            )}
                            {quiz.questionType === 'matching' && (
                                <MatchingQuestion
                                    quizData={quiz.data}
                                    indexKey={index}
                                    allQuestionsSubmitted={showCorrectAnswers}
                                    correctAnswers={correctAnswers}
                                    isCorrectAnswer={() => { }}
                                    isUserInput={() => { }}
                                />
                            )}

                            {quiz.questionType === 'fill_blank' && (
                                <FillBlankQuestion
                                    quizData={quiz.data}
                                    indexKey={index}
                                    showCorrectAnswer={showCorrectAnswers}
                                    correctAnswer={isSubmitted ? correctAnswers[index] : null}
                                    isDisable={!examStarted}
                                    isCorrectAnswer={() => { }}
                                    isUserInput={() => { }}
                                />
                            )}
                            {quiz.questionType === 'true_false' && (
                                <TrueFalseQuestion
                                    exerciseId={id}
                                    quizData={quiz.data}
                                    indexKey={index}
                                    showCorrectAnswer={showCorrectAnswers}
                                    correctAnswer={isSubmitted ? correctAnswers[index] : null}
                                    isDisable={!examStarted}
                                    isCorrectAnswer={() => { }}
                                    isUserInput={() => { }}
                                />
                            )}
                        </div>
                    ))}

                    <div className="d-flex justify-content-center">
                        {examStarted && (
                            <button onClick={handleSubmitAllQuiz} className="bg-primary border-0 rounded py-2 px-4 text-white">
                                Nộp bài
                            </button>
                        )}

                    </div>

                    <div className='container mt-5'>
                        <h3 className='text-uppercase fw-bold'>Các đề thi khác</h3>
                        <ul className="list-unstyled ps-0">
                            <li className=" border-bottom mb-1">
                                <div className="mt-1 ps-2">
                                    <ul className="btn-toggle-nav list-unstyled py-1">
                                        {tests.map((test, index) => (
                                            <li
                                                key={`test_${index}`}
                                                className='py-2 d-block border-bottom mx-4 mb-3'
                                            >
                                                <div className='fs-5 fw-bold mb-2'>
                                                    <Link to={`/Exams/ExamDetails/${test.id}`} className='mb-2' onClick={resetShowAnswers}>
                                                        <i className="fa-solid fa-caret-right pe-2 text-primary m-0"></i> {test.name}
                                                    </Link>
                                                </div>
                                                <div className='d-flex flex-wrap align-items-center justify-content-start mt-2 sub-detail'>
                                                    <div className='small pe-4'>
                                                        <i className="small pe-2 fa-solid fa-book-open-reader m-0"></i>
                                                        <span>{test.subject}</span>
                                                    </div>
                                                    <div className='small pe-4'>
                                                        <i className="small pe-2 fa-solid fa-graduation-cap m-0"></i>
                                                        <span>{test.grade}</span>
                                                    </div>
                                                    <div className='small pe-4'>
                                                        <i className="small pe-2 fa-solid fa-calendar-check m-0"></i>
                                                        <span>{test.year}</span>
                                                    </div>
                                                    <div className='small pe-4'>
                                                        <i className="small pe-2 fa-solid fa-location-dot m-0"></i>
                                                        <span>{test.province}</span>
                                                    </div>
                                                    <div className='small pe-4'>
                                                        <i className="small pe-2 fa-solid fa-clock m-0"></i>
                                                        <span>{test.timeLimit} phút</span>
                                                    </div>
                                                    <div className='small pe-4'>
                                                        <i className="small pe-2 fa-solid fa-download m-0"></i>
                                                        <span>1000</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <Link to={`/Exams`} className="my-2 text-primary fs-5" >
                                            <span>Hiển thị tất cả </span>
                                            <i className="fa-solid fa-angles-right small m-0"></i>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExamDetails;