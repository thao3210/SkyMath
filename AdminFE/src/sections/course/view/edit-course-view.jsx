import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EditFormView from "./edit-form-view";
import LoadingPage from "../../../pages/loading_page";
import CourseServices from "../../../services/CourseServices";

const EditCourseView = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await CourseServices.getCourseById(id);
          console.log("response: ", response);
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
