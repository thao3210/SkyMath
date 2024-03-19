import React, { useState } from "react";
import './Register.css';
import BgAuth from '../../assets/images/login-bg.jpg'
import LoginImg from '../../assets/images/register-2.jpg'
import Logo from '../../assets/images/LogoSkyMath.png'
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import SuccessGif from '../../assets/images/success.gif'

const Register = () => {
    const navigate = useNavigate("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
        return passwordRegex.test(password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Kiểm tra và validate dữ liệu
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        if (!validatePhone(phone)) {
            setPhoneError(true);
            return;
        } else {
            setPhoneError(false);
        }

        if (!validatePassword(password)) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        const registrationData = {
            name,
            phone,
            username,
            password,
            email,
        };

        try {
            const response = await UserService.Register(registrationData);
            if (response.status === 200) {
                setRegistrationSuccess(true);
                navigate('/Login');
                // const accessToken = response.data;
                // setLocalStorage('accessToken', accessToken);
            } else {
                console.log("Response status: ", response.status);
            }
        } catch (error) {
            console.log("Error message: ", error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '100vh', backgroundImage: `url(${BgAuth})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {registrationSuccess ? (
                <div className="bg-white d-flex align-items-center justify-content-center flex-column text-success px-5 pb-3 shadow rounded-4">
                    <img src={SuccessGif} alt="success" width={300} className=""></img>
                    <h2 className="fw-bold">Registered Successfully</h2>
                    <h5>Welcome to SKYMATH</h5>
                </div>
            ) : (
                <div className="container rounded-5 p-0 bg-white shadow-lg w-75">
                    <div className="d-lg-flex align-items-stretch justify-content-center">
                        <div className="col rounded-5" style={{ backgroundImage: `url(${LoginImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            <div className="d-flex justify-content-between align-items-center px-3">
                                <Link to="/"><img src={Logo} alt="logo" className="object-fit-cover m-3" style={{ width: '150px' }} /></Link>
                                <Link to="/" className="btn btn-sm btn-outline-dark rounded-5 px-3 me-3">
                                    <i className="fa-solid fa-home pe-2"></i>
                                    <span>Trang chủ</span>
                                </Link>
                            </div>
                        </div>
                        <div className="col py-5 px-5">
                            <div className="d-flex align-items-center justify-content-end small">
                                <span className="pe-3">Bạn đã có tài khoản?</span>
                                <Link to="/Login" className="btn btn-sm btn-outline-dark rounded-5 px-4">Đăng nhập</Link>
                            </div>
                            <h2 className="fw-bold mt-3">Chào mừng đến với SKYMATH</h2>
                            <p>Đăng ký tài khoản của bạn</p>
                            <form onSubmit={handleRegister} className="pt-3">
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="nameInput" className="form-label">Tên</label>
                                        <input type="text" className="form-control" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="phoneInput" className="form-label">Số điện thoại</label>
                                        <input type="text" className="form-control" id="phoneInput" aria-describedby="phoneError" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        {phoneError && <div id="phoneError" className="text-danger small">*Số điện thoại không hợp lệ</div>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="usernameInput" className="form-label">Tên đăng nhập</label>
                                        <input type="text" className="form-control" id="usernameInput" aria-describedby="usernameError" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="passwordInput" className="form-label">Mật khẩu</label>
                                        <input type={showPassword ? 'text' : 'password'} className="form-control" id="passwordInput" aria-describedby="passwordError" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        {passwordError && <div id="passwordError" className="text-danger small">*Mật khẩu không hợp lệ</div>}
                                        <button
                                            type="button"
                                            className="position-relative float-end btn py-0 pe-1 text-dark me-1 z-3 border border-0"
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                marginTop: '-30px',
                                            }}
                                        >
                                            {showPassword ? (<i className="fa-solid fa-eye-slash m-0"></i>) : (<i className="fa-solid fa-eye m-0"></i>)}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailError" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <div id="emailError" className="text-danger small">*Email không hợp lệ</div>}
                                </div>
                                <div className="d-flex align-items-center justify-content-center mt-4">
                                    <button type="submit" className="btn btn-dark px-5 py-2 rounded-5">Đăng ký</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            )}


        </div >
    );
}

export default Register;