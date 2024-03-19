import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingPage from "src/pages/loading_page";
import CourseServices from "src/services/CourseServices";

import EditFormView from "./edit-form-view";

const EditCourseView = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await CourseServices.getCourseById(id);
          if (response?.data && response?.status === 200) {
            setCourseData(response.data);
          } else {
            console.error(response ?? "Unexpected response structure");
          }
        } catch (error) {
          console.error(error);
        }
      };
    fetchData();
  }, [id]);

  return (
    <div>
      {courseData ? (
        <EditFormView initialValues={courseData} />
      ) : (
        <LoadingPage/>
      )}
    </div>
  );
};

export default EditCourseView;
