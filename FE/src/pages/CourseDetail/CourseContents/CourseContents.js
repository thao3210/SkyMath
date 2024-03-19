import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import PaymentPlanModal from "../../../components/Modal/PaymentPlanModal/PaymentPlanModal";
import CourseServices from "../../../services/CourseService";

function CourseContents() {
  const { id } = useParams();
  const [courseDetails, setDetailCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await CourseServices.getCourseDetailsByID(id);
        if (response && response.data) {
          setDetailCourse(response.data);
        } else {
          console.error("Course no data");
        }
      } catch (error) {
        console.error("Error getting course information", error);
      }
    };

    fetchCourseDetail();
  }, [id]);

  const renderCourseDetails = () => {
    return courseDetails?.thematicApplicationDTOs.map((thematic, thematicIndex) => (
      <div className="card-course mb-0 w-100 mb-2" key={thematic.id}>
        <div className="card-header bg-secondary bg-gradient bg-opacity-25 theme-dark-bg">
          <div className="position-relative">
            <h3 className="mb-0 font-md collapsible-link p-2">
              Chủ đề {thematicIndex + 1}: {thematic.name}
            </h3>
          </div>
        </div>
        <div className=" mb-0 w-100 mx-3">
          {thematic.lessonPreviewDTOs.map((lesson, lessonIndex) => (
            <div key={lesson.id}>
              <div className="card-header ">
                <div className="position-relative">
                  <h3 className="text-grey-700 font-xs my-3">
                    Bài {lessonIndex + 1}: {lesson.name}
                  </h3>
                </div>
              </div>
              <div className="collapse show">
                <div className="row mx-0 my-3">
                  <div className="col-sm">
                    <h5 className="text-grey-700 font-xs my-3 ">Lý thuyết</h5>
                    {lesson?.resourcePreviewDTOs &&
                      lesson.resourcePreviewDTOs.map((resource) => (
                        <div
                          className="lesson-item font-xs d-flex align-items-center with-title"
                          key={resource.id}
                        >
                          {lesson.isFree ? (
                            <Link to={`/Lesson/${lesson.id}/${resource.id}`}>
                              <i className={`far ${resource.resourceTypeName === 'Video' ? 'fa-circle-play' : 'fa-file-pdf'} fa-circle-play mx-2`}></i>
                              {resource.name}
                            </Link>
                          ) : (
                            <>
                              <div
                                data-bs-toggle="modal"
                                data-bs-target="#paymentPlanModal"
                              >
                                <i className={`far ${resource.resourceTypeName === 'Video' ? 'fa-circle-play' : 'fa-file-pdf'} fa-circle-play mx-2`}></i>
                                {resource.name}
                              </div>
                              <PaymentPlanModal />
                            </>
                          )}

                          {!lesson.isFree ? (
                            <i className="fa-solid fa-lock m-0 small text-warning ps-2"></i>
                          ) : null}
                        </div>
                      ))}
                  </div>

                  <div className="col-sm">
                    <h5 className="text-grey-700 font-xs my-3 ">Luyện tập</h5>
                    {lesson?.exercisePreviewDTOs &&
                      lesson.exercisePreviewDTOs.map((exercise) => (
                        <div
                          className="lesson-item font-xs d-flex align-items-center with-title"
                          key={exercise.id}
                        >
                          <Link to={`/Exercise/${exercise.id}/${lesson?.id}`}>
                            <i className="fa-regular fa-circle-check mx-2"></i>
                            {exercise.name}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-content"
      role="tabpanel"
      aria-labelledby="v-pills-content-tab"
      tabIndex="0"
    >
      <div className="">
        <div className="d-flex justify-content-between  mb-2">
          <h4 className="fw-normal font-md mr-auto">Nội dung khóa học</h4>
          <div className="justify-content-end">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <Link to="/" className="page-link not-hover not-focus">
                    Xem thêm
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {courseDetails && renderCourseDetails()}

      </div>
    </div>
  );
}

export default CourseContents;
