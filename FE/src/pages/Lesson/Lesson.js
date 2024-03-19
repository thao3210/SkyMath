import React, { useEffect, useState } from "react";
import './Lesson.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import LessonService from "../../services/LessonService";
import CourseServices from "../../services/CourseService";
import InteractiveYouTubeVideo from "./InteractiveYoutubeVideo/InteractiveYoutubeVideo";
import InteractiveQuestion from "./InteractiveQuestion/InteractiveQuestion";
const Lesson = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [resourceData, setResourceData] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const { id, resourceId } = useParams();
    const lessonParamId = parseInt(id, 10);
    const resourceParamId = parseInt(resourceId, 10);

    const [resourceCount, setResourceCount] = useState(0);
    const [courseId, setCourseId] = useState(null);
    const [courseDetails, setDetailCourse] = useState(null);
    const [lessonData, setLessonData] = useState([]);
    const [thematicData, setThematicData] = useState([]);
    const [currentPage, setCurrentPage] = useState(lessonParamId);
    const [firstLessonPage, setFirstLessonPage] = useState(null);
    const [lastLessonPage, setLastLessonPage] = useState(null);
    const [lessonDetailsData, setLessonDetailsData] = useState(null);
    const [listTimePause, setListTimePause] = useState([]);

    const postUserProcess = async (progressData) => {
        try {
            await CourseServices.postUserProcess(progressData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchLessonDetails = async () => {
            try {
                const response = await LessonService.getLessonById(lessonParamId);

                if (response.status === 200) {
                    const resourceDtosData = response.data?.resourceDtos || [];
                    const lessonCourseId = response.data?.courseId || null;
                    const lessonDetailsDtos = response.data;

                    setLessonDetailsData(lessonDetailsDtos);
                    setResourceData(resourceDtosData);
                    setResourceCount(resourceDtosData.length);
                    setCourseId(lessonCourseId);

                    const updatedProgressData = {
                        progressType: 'Learning',
                        progressDataId: lessonParamId,
                        courseId: response.data.courseId,
                    };

                    await postUserProcess(updatedProgressData);

                    // Find the resource with the matching ID from URL parameters
                    let initialResource = null;
                    if (resourceParamId) {
                        initialResource = resourceDtosData.find(resource => resource.id === resourceParamId);
                    }

                    if (initialResource) {
                        setSelectedResource(initialResource);
                        setListTimePause(initialResource.videoInteractPointDtos.map(point => point.seconds));
                    } else {
                        // If not found or no resourceParamId, select the first resource
                        setSelectedResource(resourceDtosData[0]);
                    }

                    // Fetch course details by course ID
                    if (lessonCourseId) {
                        const response = await CourseServices.getCourseDetailsByID(lessonCourseId);
                        if (response && response.data) {
                            setDetailCourse(response.data);

                            const thematicDtos = response.data?.thematicDetailDtos || [];
                            setThematicData(thematicDtos);

                            const lessonDtos = thematicDtos.reduce((acc, thematic) => {
                                return [...acc, ...thematic.lessonDetailDtos];
                            }, []);

                            setLessonData(lessonDtos)
                            if (lessonDtos.length > 0) {
                                setFirstLessonPage(lessonDtos[initialResource].id);
                            }

                            if (lessonDtos.length > 0) {
                                setLastLessonPage(lessonDtos[lessonDtos.length - 1].id)
                            }

                            lessonDtos.forEach((lesson) => {
                                if (lesson.id === lessonParamId) {
                                    setCurrentPage(lesson.id)
                                }
                            });

                        } else {
                            console.error("Course no data");
                        }
                    }

                    // if (resourceDtosData.length > 0) {
                    //     setSelectedResource(resourceDtosData[0]);
                    // }
                } else {
                    console.error("Error courses response status", response.status);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchLessonDetails();
    }, [lessonParamId, resourceParamId]);

    const handleResourceClick = (resource) => {
        setSelectedResource(resource);
        navigate(`/Lesson/${lessonParamId}/${resource.id}`);
    };

    const navigate = useNavigate();

    const handleNextPage = () => {
        const nextPageId = lessonDetailsData.nextLessonId;
        if (nextPageId === -1 || nextPageId === 0) {
        } else {
            navigate(`/Lesson/${nextPageId}`);
        }

    };

    const handlePreviousPage = () => {
        const previousPageId = lessonDetailsData.previousLessonId;
        if (previousPageId === -1 || previousPageId === 0) {
        } else {
            navigate(`/Lesson/${previousPageId}`);
        }
    };

    return (
        <div className="lesson-container bg-light">
            <header className="border-bottom bg-white sticky-header">
                <div className="d-flex align-items-center justify-content-between py-2 px-4">
                    <Link to={`/Course/${courseId}`} className="d-flex align-items-center justify-content-center fw-bold fs-5 text-dark text-decoration-none">
                        <i className="fa-solid fa-angle-left pe-2 m-0"></i>
                        <span>{courseDetails?.name}</span>
                    </Link>
                    <div className="fw-bold">
                        <span>{resourceCount} bài học</span>
                    </div>
                </div>
            </header>
            <section className="lesson-section d-flex flex-grow-1 tab-content" id="v-pills-tabContent-lesson">
                <div className={`col overflow-auto scrollbar tab-pane fade show active`} role="tabpanel">
                    {selectedResource && (
                        <>
                            {selectedResource.resourceTypeName === "Video" && (
                                <div className="">
                                    <InteractiveYouTubeVideo
                                        videoUrl={selectedResource.content}
                                        interactData={selectedResource.videoInteractPointDtos}
                                        lessonId={id}
                                        resourceId={resourceId}

                                    />
                                </div>
                            )}
                            {selectedResource.resourceTypeName === "PDF" && (
                                <iframe style={{ height: '80vh', width: '100%' }} src={selectedResource.content} title={selectedResource.name} allowFullScreen></iframe>

                            )}

                            <div className="px-5 py-3 border-top">
                                <h3 className="fw-bold">{selectedResource.name}</h3>
                                {/* <div className="d-flex align-items-center">
                                    <div className="pe-3">
                                        <i className="fa-solid fa-thumbs-up pe-1 m-0"></i>
                                        <span>10000</span>
                                    </div>
                                    <div className="pe-3">
                                        <i className="fa-solid fa-comments pe-1 m-0"></i>
                                        <span>300</span>
                                    </div>
                                </div> */}
                            </div>
                        </>
                    )}
                </div>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasResourceList" aria-labelledby="offcanvasResourceListLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasResourceListLabel">Các bài học</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className=" bg-white overflow-auto scrollbar">
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
                                        id="ask-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#ask-tab-pane"
                                        type="button" role="tab"
                                        aria-controls="ask-tab-pane"
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
                                    <div className=" nav-pills m-0" id="v-pills-tab-lesson" role="tablist" aria-orientation="vertical">
                                        <h5 className="fw-bold p-2">Các bài học</h5>
                                        {resourceData.map((resource) => (
                                            <button
                                                key={resource.id}
                                                className={`btn btn-light border text-start d-flex align-items-center justify-content-between ps-4 py-3 my-1 w-100 nav-link ${selectedResource && selectedResource.id === resource.id ? "active" : ""}`}
                                                data-bs-toggle="pill"
                                                type="button"
                                                role="tab"
                                                onClick={() => handleResourceClick(resource)}
                                            >
                                                <span><i className={` ${selectedResource && selectedResource.id === resource.id ? 'fa-solid' : 'fa-regular'} ${resource.resourceTypeName === 'Video' ? 'fa-circle-play' : 'fa-file-pdf'} fa-circle-play pe-2 m-0`}></i>{resource.name}</span>
                                                <i className="fa-solid fa-angle-right pe-3 m-0"></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="ask-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="ask-tab"

                                >
                                    <div className="px-2">
                                        <label className="fw-bold fs-5 py-1">Nhập câu hỏi</label>
                                        <div className="d-flex">
                                            <input type="text" className="form-control" />
                                            <button className="btn btn-dark ms-1"><i className="fa-solid fa-arrow-right m-0"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showSidebar && (
                    <>
                        <div className="col-auto col-xl-3 bg-white overflow-auto scrollbar  d-lg-block d-md-none d-sm-none d-none">
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
                                        id="ask-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#ask-tab-pane"
                                        type="button" role="tab"
                                        aria-controls="ask-tab-pane"
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
                                    <div className=" nav-pills m-0" id="v-pills-tab-lesson" role="tablist" aria-orientation="vertical">
                                        <h5 className="fw-bold p-2">Các bài học</h5>
                                        {resourceData.map((resource) => (
                                            <button
                                                key={resource.id}
                                                className={`btn btn-light border text-start d-flex align-items-center justify-content-between ps-4 py-3 my-1 w-100 nav-link ${selectedResource && selectedResource.id === resource.id ? "active" : ""}`}
                                                data-bs-toggle="pill"
                                                type="button"
                                                role="tab"
                                                onClick={() => handleResourceClick(resource)}
                                            >
                                                <span><i className={`${selectedResource && selectedResource.id === resource.id ? 'fa-solid' : 'fa-regular'} ${resource.resourceTypeName === 'Video' ? 'fa-circle-play' : 'fa-file-pdf'} pe-2 m-0`}></i>{resource.name}</span>
                                                <i className="fa-solid fa-angle-right pe-3 m-0"></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="ask-tab-pane"
                                    role="tabpanel"
                                    aria-labelledby="ask-tab"

                                >
                                    <div className="px-2">
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
                <div className="d-flex align-items-center justify-content-between py-1 px-2">
                    <div></div>
                    <div className="d-flex align-items-center justify-content-center">
                        <button
                            onClick={handlePreviousPage}
                            className={`btn border border-2 d-flex align-items-center px-3 mx-2 ${currentPage <= firstLessonPage ? 'disabled' : ''}`}
                            disabled={currentPage <= firstLessonPage ? true : false}
                        >
                            <i className="fa-solid fa-angle-left pe-1 m-0"></i>
                            Bài trước
                        </button>
                        <button
                            onClick={handleNextPage}
                            className={`btn border border-2 d-flex align-items-center px-3 mx-2 ${currentPage >= lastLessonPage ? 'disabled' : ''}`}
                            disabled={currentPage >= lastLessonPage ? true : false}
                        >
                            Bài sau
                            <i className="fa-solid fa-angle-right ps-1 m-0"></i>
                        </button>
                    </div>
                    <button
                        type="button"
                        className="btn-menu border d-lg-block d-md-none d-sm-none d-none"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <i className={`fa-solid fa-${showSidebar ? 'arrow-right' : 'bars'} m-0`}></i>
                    </button>

                    <button className="btn-menu border d-lg-none d-md-block d-sm-block d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResourceList" aria-controls="offcanvasResourceList">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Lesson;
