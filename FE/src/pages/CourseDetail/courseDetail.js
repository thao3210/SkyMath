import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TextsmsIcon from "@mui/icons-material/Textsms";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import "./CourseDetail.css";
// import AlertCourseDetail from "./Alert/Alert";
import CourseServices from "../../services/CourseService";

import CourseContents from "./CourseContents/CourseContents";
import CourseExam from "./CourseExam/CourseExam";
import FAQs from "./FAQs/FAQs";
import FAQsPremium from "./FAQsPremium/FAQsPremium";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function CourseDetail() {
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

  const [openExpertDialog, setOpenExpertDialog] = useState(false);
  const [okClicked, setOkClicked] = useState(false); 
  const handleOpenExpert = () => {
    setOpenExpertDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenExpertDialog(false);
    setOkClicked(false);
    document.getElementById("v-pills-content-tab").click();
  };

  const handleOnOk = async () => {
    try {
      handleCloseDialog();
      setOkClicked(true);
    } catch (error) {
      console.error("Failed to delete grade:", error);
    }
  };

  return (
    <div className="container-fluid">
      {/* BANNER  */}
      <div className="row mb-3 math-bg-five">
        <div className="container container-course-detail">
          <div className="row bg-dark">
            <div className="col-3 img-course">
              <div className="p-2">
                <img
                  src={courseDetails?.imageLink}
                  alt="SkyMath"
                  className="object-fit-cover lazy w-90 rounded d-lg-block d-md-none d-sm-none d-none"
                />
              </div>
            </div>

            <div className="col-md-12 col-lg-9 content-first-course">
              <h1 className="fw-700 font-lg d-block lh-4 mt-2 text-white">
                {courseDetails?.name}
              </h1>
              <p className="font-xss text-white mb-0">
                {courseDetails?.infomation}
              </p>

              <section className="py-3">
                <div className="d-flex align-items-center gap-2 py-2">
                  <span className="col-lg-1 col-md-2 col-sm-3 col-3 text-white">
                    Lý thuyết
                  </span>
                  <div
                    className="progress col-6"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow={courseDetails?.learningProccess}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${courseDetails?.learningProccess}%` }}
                    >
                      {courseDetails?.learningProccess}%
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 py-2">
                  <span className="col-lg-1 col-md-2 col-sm-3 col-3 text-white">
                    Thực hành
                  </span>
                  <div
                    className="progress col-6"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow={courseDetails?.exerciseProccess}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${courseDetails?.exerciseProccess}%` }}
                    >
                      {courseDetails?.exerciseProccess}%
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row my-4">
          {/* LEFT */}
          <div className="col-lg-3 d-flex align-items-start">
            <div className="sticky-top">
              <div
                className="nav flex-column nav-pills me-3 "
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
                style={{ top: "100px", zIndex: "1" }}
              >
                <button
                  className="nav-link active tab-course nav-link-button"
                  id="v-pills-content-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-content"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-content"
                  aria-selected="true"
                >
                  <BorderColorIcon className="mx-2" />
                  Nội dung khóa học
                </button>
                <button
                  className="nav-link tab-course nav-link-button"
                  id="v-pills-exam-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-exam"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-exam"
                  aria-selected="false"
                >
                  <AnalyticsIcon className="mx-2" />
                  Thi kiểm tra
                </button>
                <button
                  className="nav-link tab-course nav-link-button"
                  id="v-pills-faq-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-faq"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-faq"
                  aria-selected="false"
                >
                  <TextsmsIcon className="mx-2" />
                  Hỏi đáp
                </button>
                <button
                  className="nav-link tab-course nav-link-button"
                  id="v-pills-faqPremium-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-faqPremium"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-faqPremium"
                  aria-selected="false"
                  onClick={handleOpenExpert}
                >
                  <AssignmentIndIcon className="mx-2" />
                  Hỏi đáp với chuyên gia
                </button>
              </div>
            </div>
          </div>
          {/* BETWEEN  */}
          <div
            className="col-lg-6 tab-content course-between"
            id="v-pills-tabContent"
          >
            <CourseContents />

            <CourseExam />

            <FAQs />
            {okClicked && <FAQsPremium />}
            <Dialog open={openExpertDialog} onClose={handleCloseDialog}>
              <DialogTitle>Đây là dịch vụ mất phí</DialogTitle>
              <DialogContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Trả phí để có thể hỏi đáp với chuyên gia
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOnOk}
                    sx={{ ml: 1 }}
                  >
                    OK
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </div>
          {/* RIGHT */}
          <div className="col-sm-12 col-md-12 col-lg-3 d-lg-block d-md-none d-sm-none d-none col-message">
            {/* <AlertCourseDetail /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
