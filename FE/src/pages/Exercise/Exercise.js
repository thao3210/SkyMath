import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ExerciseService from "../../services/ExerciseService";
import CourseServices from "../../services/CourseService";
import MultipleChoice from "../Quiz/MultipleChoice/MultipleChoice";
import MatchingQuestion from "../Quiz/MatchingQuestion/MatchingQuestion";
import FillBlankQuestion from "../Quiz/FillBlankQuestion/FillBlankQuestion";
import TrueFalseQuestion from "../Quiz/TrueFalseQuestion/TrueFalseQuestion";
import MultipleResponse from "../Quiz/MultipleResponse/MultipleResponse";

const Exercise = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const { id, lessonId } = useParams();
    const exerciseParamId = parseInt(id, 10);
    const lessonParamId = parseInt(lessonId, 10);

    const [exerciseData, setExerciseData] = useState([]);
    const [courseDetails, setDetailCourse] = useState(null);
    const [exerciseCount, setExerciseCount] = useState(0);
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exerciseQuizList, setExerciseQuizList] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [quizType, setQuizType] = useState([]);
    const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null));
    const [allQuestionsSubmitted, setAllQuestionsSubmitted] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false); // New state variable


    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const postUserProcess = async (progressData) => {
        try {
            let result = await CourseServices.postUserProcess(progressData);
            // Handle the result as needed
            console.log(result);
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                const result = await ExerciseService.getExerciseById(exerciseParamId, lessonParamId);

                if (result.status === 200) {
                    const exerciseData = result.data;
                    const exerciseListData = result.data?.exerciseList || [];
                    const exerciseQuizListData = result.data?.exercise || [];

                    setExerciseData(exerciseData);
                    setExerciseCount(exerciseListData.length);

                    setExerciseList(exerciseListData);
                    setExerciseQuizList(Object.values(exerciseQuizListData));

                    const quizDataArray = Object.values(exerciseQuizListData).map(quiz => quiz.data);
                    const quizTypeArray = Object.values(exerciseQuizListData).map(quiz => quiz.questionType);

                    setQuizData(quizDataArray);
                    setQuizType(quizTypeArray);


                    if (exerciseData.courseId) {
                        const responseCourseDetails = await CourseServices.getCourseDetailsByID(exerciseData.courseId);
                        if (responseCourseDetails && responseCourseDetails.data) {
                            setDetailCourse(responseCourseDetails.data);
                        }
                    }

                    if (exerciseParamId) {
                        const selectedExercise = exerciseListData.find(exercise => exercise.Id === exerciseParamId);
                        setSelectedExercise(selectedExercise);

                        // Reset showCorrectAnswers when navigating to a new exercise
                        setShowCorrectAnswers(false);
                    }

                    const updatedProgressData = {
                        progressType: 'Exercise',
                        progressDataId: exerciseParamId,
                        courseId: exerciseData.courseId,
                    };
                    await postUserProcess(updatedProgressData);
                }
            } catch (error) {
                console.error('Error fetching exercise data:', error);
            }
        };

        fetchExerciseData();
    }, [exerciseParamId, lessonParamId]);

    const navigate = useNavigate();

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        navigate(`/Exercise/${exercise.Id}/${lessonParamId}`);
        setShowCorrectAnswers(false);
        console.log('click:', exercise);
    }

    const handleAnswerSelected = (questionIndex, selectedAnswer) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[questionIndex] = selectedAnswer;
        setUserAnswers(updatedUserAnswers);
    };

    const handleSubmitAllQuiz = () => {
        // Check if all questions are answered
        if (userAnswers.every((answer) => answer !== null)) {
            setAllQuestionsSubmitted(true);
            setIsSubmitted(true);

            // Calculate and store correct answers
            const correctAnswersArray = quizData.map((quiz, index) => {
                if (quiz.questionType === "multiple_choice") {
                    return quiz.correctAnswer - 1; // Index of correct answer in options array
                } else if (quiz.questionType === "fill_blank") {
                    return quiz.answer.correctAnswers; // Array of correct answers
                } else if (quiz.questionType === "matching") {
                    return quiz.answer.bSide.map((item) => item.id);
                } else if (quiz.questionType === "true_false") {
                    return quiz.answer.toString(); // Correct answer (true or false)
                }
                return null;
            });

            setCorrectAnswers(correctAnswersArray);
            // Set showCorrectAnswers to true after submitting all questions
            setShowCorrectAnswers(true);
        } else {
            console.log("Please answer all questions before submitting.");
        }
    };


    return (
        <div className="lesson-container bg-light ">
            <header className="border-bottom bg-white sticky-header">
                <div className="d-flex align-items-center justify-content-between py-2 px-4">
                    <Link to={`/Course/${exerciseData.courseId}`} className="d-flex align-items-center justify-content-center fw-bold fs-5 text-dark text-decoration-none">
                        <i className="fa-solid fa-angle-left pe-2 m-0"></i>
                        <span>{courseDetails?.name}</span>
                    </Link>
                    <div className="fw-bold">
                        <span>{exerciseCount} bài tập</span>
                    </div>
                </div>
            </header>
            <section className="lesson-section d-flex flex-grow-1 tab-content" id="v-pills-tabContent-exercise">
                <div className={`col overflow-auto scrollbar tab-pane fade show active`} role="tabpanel">
                    <div className="px-5 pt-3 pb-5">
                        <h3 className="fw-bold py-3">Luyện tập </h3>
                        {exerciseQuizList.map((quiz, index) => (
                            <div key={index} className="pb-3">
                                {quiz.questionType === 'multiple_choice' && quiz.answerType === 'Single' && (
                                    <MultipleChoice
                                        exerciseId={exerciseParamId}
                                        quizData={quiz.data}
                                        indexKey={index}
                                        onAnswerSelected={(selectedAnswer) => handleAnswerSelected(index, selectedAnswer)}
                                        showCorrectAnswer={showCorrectAnswers}
                                        correctAnswer={isSubmitted ? correctAnswers[index] : null}
                                        isCorrectAnswer={() => { }}
                                        isUserInput={() => { }}
                                    />
                                )}
                                {quiz.questionType === 'multiple_choice' && quiz.answerType === 'Multiple' && (
                                    <MultipleResponse
                                        exerciseId={exerciseParamId}
                                        quizData={quiz.data}
                                        indexKey={index}
                                        onAnswerSelected={(selectedAnswer) => handleAnswerSelected(index, selectedAnswer)}
                                        showCorrectAnswer={showCorrectAnswers}
                                        correctAnswer={isSubmitted ? correctAnswers[index] : null}
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
                                        isCorrectAnswer={() => { }}
                                        isUserInput={() => { }}
                                    />
                                )}
                                {quiz.questionType === 'true_false' && (
                                    <TrueFalseQuestion
                                        exerciseId={exerciseParamId}
                                        quizData={quiz.data}
                                        indexKey={index}
                                        showCorrectAnswer={showCorrectAnswers}
                                        correctAnswer={isSubmitted ? correctAnswers[index] : null}
                                        isCorrectAnswer={() => { }}
                                        isUserInput={() => { }}
                                    />
                                )}
                            </div>
                        ))}

                        <div className="d-flex align-items-center gap-2">
                            {isSubmitted && (
                                <Link to={`/Course/${exerciseData.courseId}`} className="bg-body-secondary rounded py-2 px-3 text-dark">Trở về</Link>
                            )}
                            <button onClick={handleSubmitAllQuiz} className="bg-primary border-0 rounded py-2 px-3 text-white">Nộp bài</button>

                        </div>
                    </div>

                </div>
                {showSidebar && (
                    <>
                        <div className="col-auto col-xl-3 bg-white overflow-auto scrollbar d-lg-block d-md-none d-sm-none d-none">
                            <ul className="nav nav-tabs sticky-tabs bg-white" id="tabSidebar" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link px-4 fs-4 active"
                                        id="list-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#list-tab-pane"
                                        type="button"
                                        role="tab"
                                        aria-controls="list-tab-pane"
                                        aria-selected="true"
                                    >
                                        <i className="fa-solid fa-list-ul m-0"></i>
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link px-4 fs-4"
                                        id="profile-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#profile-tab-pane"
                                        type="button" role="tab"
                                        aria-controls="profile-tab-pane"
                                        aria-selected="false"
                                    >
                                        <i className="fa-solid fa-circle-question m-0"></i>
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="tabSidebarContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="list-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="list-tab"
                                >
                                    <div className=" nav-pills m-0" id="v-pills-tab-exercise" role="tablist" aria-orientation="vertical">
                                        <h5 className="fw-bold p-2">Các bài luyện tập</h5>
                                        {exerciseList.map((exercise, index) => (
                                            <button
                                                key={index}
                                                className={`btn btn-light text-start d-flex align-items-center justify-content-between ps-4 py-3 my-1 w-100 nav-link ${selectedExercise && selectedExercise.Id === exercise.Id ? 'active' : ''}`}
                                                data-bs-toggle="pill"
                                                type="button"
                                                role="tab"
                                                onClick={() => handleExerciseClick(exercise)}
                                            >
                                                <span>
                                                    <i className={`${selectedExercise && selectedExercise.Id === exercise.Id ? 'fa-solid' : 'fa-regular'} fa-circle-check pe-2 m-0`}></i>
                                                    {exercise.Name}
                                                </span>
                                                <i className="fa-solid fa-angle-right pe-3 m-0"></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="profile-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="profile-tab"
                                >
                                    <div className="">
                                        <label className="fw-bold fs-5 py-1">Nhập câu hỏi</label>
                                        <div className="d-flex">
                                            <input type="text" className="form-control" />
                                            <button className="btn btn-dark ms-1"><i className="fa-solid fa-arrow-right m-0"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </section>
            <footer className="border-top bg-white sticky-footer">
                <div className="d-flex align-items-center justify-content-end py-1 px-2">
                    <button
                        type="button"
                        className="btn-menu border"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <i className={`fa-solid fa-${showSidebar ? 'arrow-right' : 'bars'} m-0`}></i>

                    </button>
                </div>
            </footer>
        </div >
    );
}

export default Exercise;