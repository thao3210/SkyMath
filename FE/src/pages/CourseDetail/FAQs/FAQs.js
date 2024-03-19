import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import IntroImg from "../../../assets/images/intro.png";

import FAQsService from "../../../services/FAQsService";

import CustomSnackbar from "../../../components/snackbar/snackbar";

function FAQs() {
  const { id } = useParams();

  const [userQuestion, setUserQuestion] = useState("");
  const [selectedQuestionImage, setSelectedQuestionImage] = useState(null);
  const [selectedQuestionVideo, setSelectedQuestionVideo] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [, setShowImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showVideo, setShowVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [, setShowImageAnswer] = useState(null);
  const [previewImageAnswer, setPreviewImageAnswer] = useState(null);
  const [showVideoAnswer, setShowVideoAnswer] = useState(null);
  const [previewVideoAnswer, setPreviewVideoAnswer] = useState(null);

  const [updatedContent, setUpdatedContent] = useState("");
  const [updateIdQuestion, setUpdateIdQuestion] = useState(null);
  const [selectedImageForUpdate, setSelectedImageForUpdate] = useState(null);
  const [selectedVideoForUpdate, setSelectedVideoForUpdate] = useState(null);
  const [, setShowUpdateImage] = useState(null);
  const [previewUpdateImage, setPreviewUpdateImage] = useState(null);
  const [showUpdateVideo, setShowUpdateVideo] = useState(null);
  const [previewUpdateVideo, setPreviewUpdateVideo] = useState(null);

  const [alert, setAlert] = useState({
    message: null,
    severity: "success",
    isOpen: false,
  });
  const showAlert = (severity, message) => {
    setAlert({ severity, message, isOpen: true });
  };
  const handleCloseAlert = () => {
    setAlert({ message: null, severity: "success", isOpen: false });
  };
  const handleFileImagesChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setShowImage(event.target.files[0]);
      };
      reader.readAsDataURL(file);

      setShowImage(file);
    } else {
      setPreviewImage(null);
      setShowImage(null);
    }
  };
  const handleFileVideoChange = (event) => {
    const video = event.target.files[0];

    if (video && video.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result);
      };
      reader.readAsDataURL(video);

      setShowVideo(video);
    } else {
      setPreviewVideo(null);
      setShowVideo(null);
    }
  };
  const handleImagesAnswerChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageAnswer(reader.result);
        setShowImageAnswer(event.target.files[0]);
      };
      reader.readAsDataURL(file);

      setShowImageAnswer(file);
    } else {
      setPreviewImageAnswer(null);
      setShowImageAnswer(null);
    }
  };
  const handleVideoAnswerChange = (event) => {
    const video = event.target.files[0];

    if (video && video.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideoAnswer(reader.result);
      };
      reader.readAsDataURL(video);

      setShowVideoAnswer(video);
    } else {
      setPreviewVideoAnswer(null);
      setShowVideoAnswer(null);
    }
  };

  const handleUpdateImagesChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUpdateImage(reader.result);
        setShowUpdateImage(event.target.files[0]);
      };
      reader.readAsDataURL(file);

      setShowUpdateImage(file);
    } else {
      setPreviewUpdateImage(null);
      setShowUpdateImage(null);
    }
  };
  const handleUpdateVideoChange = (event) => {
    const video = event.target.files[0];

    if (video && video.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUpdateVideo(reader.result);
      };
      reader.readAsDataURL(video);

      setShowUpdateVideo(video);
    } else {
      setPreviewUpdateVideo(null);
      setShowUpdateVideo(null);
    }
  };
  const handleUpdateQuestion = async () => {
    try {
      if (updateIdQuestion) {
        const formData = new FormData();

        if (updatedContent) {
          formData.append("FAQResourceTypeName", "Text");
          formData.append("UpdateContent", updatedContent);
          formData.append("FAQType", "question");
        } else if (selectedImageForUpdate) {
          formData.append("FAQResourceTypeName", "Image");
          formData.append("File", selectedImageForUpdate);
          formData.append("FAQType", "question");
        } else if (selectedVideoForUpdate) {
          formData.append("FAQResourceTypeName", "Video");
          formData.append("File", selectedVideoForUpdate);
          formData.append("FAQType", "question");
        }

        const response = await FAQsService.editQuestion(
          updateIdQuestion,
          formData
        );

        showAlert("success", "Yêu cầu đã được gửi đi! Chờ phê duyệt");
        setUpdatedContent("");
        setSelectedImageForUpdate(null);
        setSelectedVideoForUpdate(null);
        console.log(response);
      } else {
        showAlert("error", "Yêu cầu gặp lỗi.");
      }
    } catch (error) {
      console.error("Error updating question", error);
      showAlert("error", "Yêu cầu gặp lỗi. Kiểm tra lại các yêu cầu.");
    }
  };

  const submitAnswer = async () => {
    try {
      if (currentQuestion) {
        const formData = new FormData();

        if (userAnswer) {
          formData.append("Content", userAnswer);
          formData.append("FAQResourceTypeName", "Text");
          formData.append("FAQQuestionId", currentQuestion);
        }

        if (selectedImage) {
          formData.append("FAQResourceTypeName", "Image");
          formData.append("File", selectedImage);
          formData.append("FAQQuestionId", currentQuestion);
        }
        if (selectedVideo) {
          formData.append("FAQResourceTypeName", "Video");
          formData.append("File", selectedVideo);
          formData.append("FAQQuestionId", currentQuestion);
        }
        const response = await FAQsService.addAnswer(formData);
        if (response && response.status === 201) {
          showAlert(
            "success",
            "Câu trả lời đã được gửi! Chờ thời gian phê duyệt."
          );
          setUserAnswer("");
          setSelectedImage(null);
          setSelectedVideo(null);
        } else {
          showAlert("error", "Lỗi gửi câu trả lời.");
        }
      } else {
        showAlert("error", "Lỗi gửi câu trả lời.");
      }
    } catch (error) {
      showAlert("error", "Lỗi gửi câu trả lời.");
    }
  };
  const submitQuestion = async () => {
    try {
      if (id) {
        const formData = new FormData();
        if (userQuestion) {
          formData.append("Content", userQuestion);
          formData.append("FAQResourceTypeName", "Text");
          formData.append("CourseId", id);
          formData.append("Premium", "true");
        }
        if (selectedQuestionImage) {
          formData.append("FAQResourceTypeName", "Image");
          formData.append("CourseId", id);
          formData.append("File", selectedQuestionImage);
          formData.append("Premium", "true");
        }
        if (selectedQuestionVideo) {
          formData.append("FAQResourceTypeName", "Video");
          formData.append("CourseId", id);
          formData.append("File", selectedQuestionVideo);
          formData.append("Premium", "true");
        }

        const response = await FAQsService.addQuestion(formData);
        if (response && response.status === 201) {
          showAlert("success", "Câu hỏi đã được gửi! Chờ thời gian phê duyệt.");
          setUserQuestion("");
          setSelectedQuestionImage(null);
          setSelectedQuestionVideo(null);
        } else {
          showAlert("error", "Lỗi gửi câu hỏi.");
        }
      } else {
        showAlert("eror", "Lỗi gửi câu hỏi.");
      }
    } catch (error) {
      showAlert("error", "Lỗi gửi câu hỏi.");
    }
  };

  const [faq, setFaqs] = useState([]);
  const getFAQs = async () => {
    try {
      const response = await FAQsService.getCourseFAQsByID(id, true);
      if (response && response.data) {
        setFaqs(response.data);
      } else {
        console.error("Error response status", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFAQs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="tab-pane fade"
      id="v-pills-faq"
      role="tabpanel"
      aria-labelledby="v-pills-faq-tab"
      tabIndex="0"
      style={{ border: "none" }}
    >
      <CustomSnackbar
        open={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <div className="card card-body my-2">
        <div className="mb-2">
          <div className="d-flex ">
            <div className="flex-shrink-0">
              <img
                className="lazy rounded-circle imaged rounded mr-05 img-avatar-messages"
                alt=""
                src={IntroImg}
              />
            </div>
            <div className="flex-grow-1 ms-3 ml-2">
              <strong className="d-block name">
                <span className="text-dark">QuestionNew</span>
              </strong>
            </div>
          </div>{" "}
        </div>

        <div className="">
          <div className="container">
            {previewImage && (
              <div>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}

            {previewVideo && (
              <div>
                <video controls width="300" height="200">
                  <source src={previewVideo} type={showVideo.type} />
                </video>
              </div>
            )}
          </div>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Bạn có thể đăng câu hỏi về bài học này ở đây"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
            />
            <label
              className="input-group-comment me-3"
              htmlFor="uploadQuestionImage"
            >
              <i className="fas fa-image ms-1"></i>
            </label>
            <label
              className="input-group-comment me-3"
              htmlFor="uploadQuestionVideo"
            >
              <i className="fa-brands fa-youtube"></i>
            </label>
          </div>
        </div>
        <input
          id="uploadQuestionImage"
          type="file"
          accept="image/*"
          className="invisible d-none"
          onChange={(e) => {
            setSelectedQuestionImage(e.target.files[0]);
            handleFileImagesChange(e);
          }}
        />

        <input
          id="uploadQuestionVideo"
          type="file"
          accept="video/*"
          className="invisible d-none"
          onChange={(e) => {
            setSelectedQuestionVideo(e.target.files[0]);
            handleFileVideoChange(e);
          }}
        />

        <div className="d-flex justify-content-end ">
          <button
            className="btn btn-primary mt-1 me-3"
            onClick={submitQuestion}
          >
            Gửi câu hỏi
          </button>
        </div>
      </div>

      {faq.map((faq) => (
        <div key={faq.id} className="card card-body my-2">
          <div className="card-text d-flex bd-highlight">
            <div className="w-75 bd-highlight card-link-profile">
              <div className="d-flex ">
                <div className="flex-shrink-0">
                  <img
                    className="lazy rounded-circle imaged rounded img-avatar-messages mr-05"
                    src={faq.userFAQInformationDto.avatar}
                    alt={faq.userFAQInformationDto.name || "User"}
                  />
                </div>
                <div className="flex-grow-1 ms-3 ml-2 mb-3">
                  <strong className="d-block name">
                    <Link
                      className="text-dark"
                      data-user-popover="15476658222240"
                    >
                      <h5 tag="5" className="fw-bold mb-0">Question</h5>
                    </Link>
                  </strong>

                  <small key={faq.id} className="extra">
                    {new Date(faq.lastModifiedDate).toLocaleDateString("en-GB")}
                  </small>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="card-view-post ms-3">
            {faq.faqResourceTypeName === "Text" && (
              <div className="h5 card-post-content">
                <p>{faq.content}</p>
              </div>
            )}
            {faq.faqResourceTypeName === "Image" && (
              <div>
                <img
                  src={faq.content}
                  alt={""}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                // onLoad={() => setPreviewImage(faq.content)}
                />
              </div>
            )}
            {faq.faqResourceTypeName === "Video" && (
              <div>
                <video controls width="300" height="200">
                  <source src={faq.content} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="mt-3 mb-1">
              {/* <Link to="" className="course-ask">
                #Toán 1 (Cánh Diều)
              </Link> */}
              <button
                className="btn btn-light"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#updateQuestionModal_${faq.id}`}
                onClick={() => setUpdateIdQuestion(faq.id)}
              >
                <i className="fa-solid fa-pen-to-square p-0 m-0"></i>
              </button>
            </div>
          </div>
          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id={`updateQuestionModal_${faq.id}`}
            tabIndex="1"
            aria-labelledby={`exampleModalLabel_${faq.id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id={`exampleModalLabel_${faq.id}`}
                  >
                    Sửa câu hỏi
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {faq.faqResourceTypeName === "Text" && (
                    <input
                      type="text"
                      className="form-control ms-5 w-75"
                      value={updatedContent}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                  )}
                  {faq.faqResourceTypeName === "Image" && (
                    <div className="d-flex">
                      <img
                        src={faq.content}
                        alt=""
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                      {previewUpdateImage && (
                        <div>
                          <img
                            src={previewUpdateImage}
                            alt="Preview"
                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setSelectedImageForUpdate(e.target.files[0]);
                          handleUpdateImagesChange(e);
                        }}
                      />
                    </div>
                  )}
                  {faq.faqResourceTypeName === "Video" && (
                    <div>
                      <video controls width="300" height="200">
                        <source src={faq.content} type="video/mp4" />
                      </video>
                      {previewUpdateVideo && (
                        <div>
                          <video controls width="300" height="200">
                            <source
                              src={previewUpdateVideo}
                              type={showUpdateVideo.type}
                            />
                          </video>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          setSelectedVideoForUpdate(e.target.files[0]);
                          handleUpdateVideoChange(e);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdateQuestion}
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="card-text d-flex bd-highlight mb-2">
            <div className="flex-grow-1 bd-highlight">
              <div className="load-comment-trigger" data-id="8603800832356">
                <i
                  className="hand font-xs far fa-comment refresh-cache-comment-trigger"
                  data-count="12"
                ></i>
                <span className="mx-2">12</span>
              </div>
            </div>
          </div> */}
          <div
            className="create-comment-trigger align-items-center pb-2 ps-4"
            data-id-post="8603800832356"
            data-id-parent="0"
          >
            {faq.faqAnswerDtos && faq.faqAnswerDtos.length > 0 && (
              <div className="answer">
                {faq.faqAnswerDtos.map((answer) => (
                  <div key={answer.id} className="card-text bd-highlight mt-2">
                    <div className="w-75 bd-highlight card-link-profile">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            className="lazy rounded-circle imaged rounded img-avatar-messages mr-05"
                            src={answer.userFAQInformationDto.avatar}
                            alt={answer.userFAQInformationDto.name || "User"}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3 ml-2 mb-3">
                          <strong className="d-block name">
                            <div
                              className="text-dark mt-2"
                              data-user-popover="15476658222240"
                            >
                              <h5 tag="5" className="fw-bold mb-0">Answer</h5>
                            </div>
                          </strong>
                          <small key={faq.id} className="extra">
                            {new Date(
                              answer.lastModifiedDate
                            ).toLocaleDateString("en-GB")}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ps-5 ms-3">
                      {answer.faqResourceTypeName === "Text" && (
                        <div className="h5 card-post-content">
                          <p>{answer.content}</p>
                        </div>
                      )}
                      {answer.faqResourceTypeName === "Image" && (
                        <div>
                          <img
                            src={answer.content}
                            alt={""}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "200px",
                            }}
                          />
                        </div>
                      )}
                      {answer.faqResourceTypeName === "Video" && (
                        <div>
                          <video controls width="300" height="200">
                            <source src={answer.content} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2">
              <div className="">
                <div className="d-flex">
                  <img
                    className="ms-2 me-1 rounded-circle img-avatar-messages"
                    alt=""
                    src={IntroImg}
                  />
                  <div
                    className="text-dark mt-2"
                    data-user-popover="15476658222240"
                  >
                    <h5 tag="5">Answer</h5>
                  </div>
                </div>

                {currentQuestion === faq.id && previewImageAnswer && (
                  <div className="mx-5 my-1">
                    <img
                      src={previewImageAnswer}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </div>
                )}
                {currentQuestion === faq.id && previewVideoAnswer && (
                  <div className="mx-5 my-1">
                    <video controls width="300" height="200">
                      <source
                        src={previewVideoAnswer}
                        type={showVideoAnswer.type}
                      />
                    </video>
                  </div>
                )}
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control ms-5"
                  placeholder="Nhập câu trả lời..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onClick={() => setCurrentQuestion(faq.id)}
                  data-user-popover="15476658222244"
                />
                <label
                  className="input-group-comment me-3"
                  htmlFor="uploadFileImage"
                  onClick={() => setCurrentQuestion(faq.id)}
                >
                  <i className="fas fa-image ms-1"></i>
                </label>
                <label
                  className="input-group-comment me-3"
                  htmlFor="uploadFileVideo"
                  onClick={() => setCurrentQuestion(faq.id)}
                >
                  <i className="fa-brands fa-youtube"></i>
                </label>
              </div>
            </div>

            <input
              id="uploadFileImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
                handleImagesAnswerChange(e);
              }}
              className="invisible d-none"
            />
            <input
              id="uploadFileVideo"
              type="file"
              accept="video/*"
              onChange={(e) => {
                setSelectedVideo(e.target.files[0]);
                handleVideoAnswerChange(e);
              }}
              className="invisible d-none"
            />
            <div className="d-flex justify-content-end ">
              <button
                className="btn btn-primary mt-1 me-3"
                onClick={submitAnswer}
              >
                Gửi câu trả lời
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQs;
