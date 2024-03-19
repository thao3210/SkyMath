import React, { useState } from "react";
import CheckImg from "../../assets/images/check.png";

import "./contact.css";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";

function ContactUs() {
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

  const contactInfo = [
    { icon: "fa-map-marker", text: "Địa chỉ: 19 Hai Bà Trưng - Hà Nội" },
    {
      icon: "fa-phone",
      text: "Điện thoại: ",
      link: "tel://1234567920",
      value: "035 2355 98",
    },
    {
      icon: "fa-paper-plane",
      text: "Email: ",
      link: "mailto:info@yoursite.com",
      value: "info@yoursite.com",
    },
    {
      icon: "fa-globe",
      text: "Website: ",
      link: "https://www.skymath.com",
      value: "SkyMath.com",
    },
  ];
  return (
    <section class="contact">
      <div class="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center my-5">
            <h2 className="heading-section">Liên hệ với chúng tôi</h2>
          </div>
        </div>
        <div className="row mb-5">
          {contactInfo.map((info, index) => (
            <div key={index} className="col-md-3 icon-contact">
              <div className="dbox w-100 text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className={`fa ${info.icon}`}></span>
                </div>
                <div className="text">
                  <p>
                    <span>{info.text}</span>
                    {info.link ? (
                      <a href={info.link}>{info.value}</a>
                    ) : (
                      info.value
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="row justify-content-center">
          <div class="wrapper">
            <div class="row no-gutters mb-5">
              <div class="col-md-12">
                <div class="contact-wrap w-100 p-md-5 p-4">
                  <h3 class="mb-4">Đăng kí tư vấn về khóa học</h3>
                  <form
                    method="POST"
                    id="contactForm"
                    name="contactForm"
                    class="contactForm"
                    onSubmit={handleSubmit}
                  >
                    <div class="row">
                      <div class="col-md-6 my-3">
                        <div class="form-group">
                          <label class="label my-2" for="name">
                            Họ và Tên
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="name"
                            id="name"
                            placeholder="Họ và Tên"
                          ></input>
                        </div>
                      </div>
                      <div class="col-md-6 my-3">
                        <div class="form-group">
                          <label class="label my-2" for="email">
                            Email
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                          ></input>
                        </div>
                      </div>
                      <div class="col-md-12 my-3">
                        <div class="form-group">
                          <label class="label my-2" for="subject">
                            Khối lớp
                          </label>
                          <select
                            class="form-control"
                            name="subject"
                            id="subject"
                          >
                            <option value="option1">Toán lớp 1</option>
                            <option value="option2">Toán lớp 2</option>
                            <option value="option3">Toán lớp 3</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-12 my-3">
                        <div class="form-group">
                          <label class="label my-2" for="#">
                            Lời nhắn
                          </label>
                          <textarea
                            name="message"
                            class="form-control"
                            id="message"
                            cols="30"
                            rows="4"
                            placeholder="Viết lời nhắn đến chúng tôi..."
                          ></textarea>
                        </div>
                      </div>
                      <div class="col-md-12 w-100">
                        <div class="form-group">
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
                                sx={{ position: "absolute", top: "-20px", right: "-3px" }}
                              ><i class="fa-solid fa-xmark"></i></IconButton>
                              <img src={CheckImg} alt="" style={{ width: "60px", margin: "10px" }} />
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
