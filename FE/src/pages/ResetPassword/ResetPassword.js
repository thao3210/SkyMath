import React, { useState } from "react";
import BgAuth from '../../assets/images/login-bg.jpg'
import LoginImg from '../../assets/images/register-2.jpg'
import Logo from '../../assets/images/LogoSkyMath.png'
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        // Check for errors
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        }

        if (!verifyCode) {
            newErrors.verifyCode = "Verification code is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        // If there are errors, stop the submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        console.log(email);
    }

    return (
        <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '100vh', backgroundImage: `url(${BgAuth})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="container rounded-5 p-0 bg-white shadow-lg">
                <div className="d-lg-flex align-items-stretch justify-content-center">
                    <div className="col d-flex align-items-center rounded-5" style={{ backgroundImage: `url(${LoginImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        <div className="h-100">
                            <Link to="/"><img src={Logo} alt="logo" className="m-3" style={{ objectFit: 'cover', width: '150px' }} /></Link>
                        </div>
                    </div>
                    <div className="col py-4 px-5 mt-4 mb-3">
                        <h2 className="fw-bold mt-3">Đặt lại mật khẩu</h2>
                        <span>Email xác minh sẽ được gửi đến hộp thư.</span>
                        <p>Xin vui lòng kiểm tra.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label fw-bold">Email</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`form-control ${submitted && errors.email ? 'is-invalid' : ''}`}
                                        id="emailInput"
                                        placeholder="hovaten@gmail.com"
                                        aria-describedby="emailError"
                                    />
                                    <button className="btn btn-dark" type="button" id="sendMailBtn"><i className="fa-solid fa-arrow-right m-0"></i></button>
                                </div>
                                {submitted && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="verifyCodeInput" className="form-label fw-bold">Mã xác nhận</label>
                                <input
                                    type="text"
                                    value={verifyCode}
                                    onChange={(e) => setVerifyCode(e.target.value)}
                                    className={`form-control ${submitted && errors.verifyCode ? 'is-invalid' : ''}`}
                                    id="verifyCodeInput"
                                    aria-describedby="verifyCodeError"
                                />
                                {submitted && errors.verifyCode && <div className="invalid-feedback">{errors.verifyCode}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label fw-bold">Mật khẩu mới</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`form-control ${submitted && errors.password ? 'is-invalid' : ''}`}
                                    id="passwordInput"
                                />
                                <button
                                    type="button"
                                    className="position-relative float-end btn py-0 pe-1  text-dark me-1 z-3 border border-0"
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        marginTop: '-30px',
                                    }}
                                >
                                    {showPassword ? (<i className="fa-solid fa-eye-slash m-0"></i>) : (<i className="fa-solid fa-eye m-0"></i>)}
                                </button>
                                {submitted && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="d-flex align-items-center justify-content-center mt-4 mb-4">
                                <button type="submit" className="btn btn-dark px-5 py-2 rounded-5">Lưu</button>
                            </div>
                            <Link to="/Login" className="btn btn-sm btn-outline-dark rounded-5 px-3"><i className="fa-solid fa-arrow-left pe-2 m-0"></i><span>Trở lại trang đăng nhập</span></Link>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default ResetPassword;