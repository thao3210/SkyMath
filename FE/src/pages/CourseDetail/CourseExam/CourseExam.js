import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseServices from "../../../services/CourseService";

function CourseExam() {
  const { id } = useParams();
  const [courseTests, setCourseTests] = useState([]);

  useEffect(() => {
    const fetchCourseTests = async () => {
      try {
        const response = await CourseServices.getListCourseTestByCourseId(id);
        if (response && response.data) {
          setCourseTests(response.data);

          console.log(response.data);
        } else {
          console.error("Course no data");
        }
      } catch (error) {
        console.error("Error getting course information", error);
      }
    };

    fetchCourseTests();
  }, [id]);

  return (
    <div
      className="tab-pane fade"
      id="v-pills-exam"
      role="tabpanel"
      aria-labelledby="v-pills-exam-tab"
      tabIndex="0"
    >
      <div className="d-flex justify-content-between  mb-2">
        <h4 className="fw-normal font-md mr-auto">Danh sách bài kiểm tra</h4>
      </div>
      <div>
        <div>
          {courseTests.map((test, index) => (
            <div key={index} className='border rounded shadow-sm mb-3 d-flex align-items-center justify-content-between px-3 py-2 gap-3'>
              <Link to={`/Course/Test/${test.id}`} className='fs-6 fw-bold'>
                <i className="fa-solid fa-caret-right pe-2 text-primary m-0"></i> {test.name}
              </Link>
              <span>{test.timeLimit} phút</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseExam;
