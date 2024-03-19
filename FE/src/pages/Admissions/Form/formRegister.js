import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CheckImg from "../../../assets/images/check.png";
import IntroImg from "../../../assets/images/skymathCourse.png";
import "./formRegister.css";


function FormRegisterCourse() {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpen();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid green",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(false);
  return (
    <div className="container-fluid form-register-course">
      <div className="row">
        <div className="col-xl-6">
          <div>
            <img className="d-xl-block d-lg-none d-md-none d-sm-none d-none mx-5 w-75" src={IntroImg} alt="" />
          </div>
        </div>
        <div className="col-xl-6 mt-5">
          <h2>Đăng kí khóa học tại SkyMath</h2>
          <form
            method="POST"
            id="contactForm"
            name="contactForm"
            className="contactForm"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="label my-2" htmlFor="name">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Họ và Tên"
                  ></input>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="label my-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email"
                  ></input>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="label my-2" htmlFor="subject">
                    Khối lớp
                  </label>
                  <select className="form-control" name="subject" id="subject">
                    <option value="option1">Toán lớp 1</option>
                    <option value="option2">Toán lớp 2</option>
                    <option value="option3">Toán lớp 3</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="form-group">
                  <label className="label my-2" htmlFor="subject">
                    Khóa học
                  </label>
                  <select className="form-control" name="subject" id="subject">
                    <option value="option1">Theo ngày</option>
                    <option value="option2">Theo khối</option>
                    <option value="option3">Theo tháng</option>
                    <option value="option3">Theo quý</option>
                    <option value="option3">Theo năm</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12 my-3">
                <div className="form-group">
                  <label className="label my-2" htmlFor="#">
                    Lời nhắn
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    cols="30"
                    rows="4"
                    placeholder="Viết lời nhắn đến chúng tôi..."
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 w-100">
                <div className="form-group">
                  <button
                    className="btn btn-primary my-4 submit-contact"
                    onClick={handleOpen}
                  >
                    Gửi đăng kí
                  </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={{ ...style, textAlign: "center" }}>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                          position: "absolute",
                          top: "-20px",
                          right: "-3px",
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </IconButton>
                      <img
                        src={CheckImg}
                        alt=""
                        style={{ width: "60px", margin: "10px" }}
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ color: "green", textAlign: "center" }}
                      >
                        Thành công
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        style={{ textAlign: "center" }}
                      >
                        Lời nhắn của bạn đã được gửi đi.
                      </Typography>

                      <Button onClick={handleCancel} sx={{ mt: 2 }}>
                        {/* Hủy bỏ */}
                      </Button>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormRegisterCourse;
