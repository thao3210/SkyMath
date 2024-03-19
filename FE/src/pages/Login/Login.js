import React, { useState } from "react";
import './Login.css';
import BgAuth from '../../assets/images/login-bg.jpg'
import LoginImg from '../../assets/images/register-2.jpg'
import Logo from '../../assets/images/LogoSkyMath.png'
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { ClientId, setLocalStorage } from "../../services/agent";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [passwordError, setPasswordError] = useState(false);
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        const loginData = {
            username,
            password,
        };

        try {
            const response = await UserService.Login(loginData);
            if (response.status === 200) {
                const accessToken = response.data;
                // if (rememberMe) {
                setLocalStorage('accessToken', accessToken);
                // } else {
                sessionStorage.setItem('accessToken', accessToken);
                // document.cookie = `accessToken=${accessToken}; max-age=900`; 
                // }
                navigate('/');
            } else {
                console.log("Response status: ", response.status);
            }
        } catch (error) {
            console.log("Error message: ", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const res = await UserService.LoginViaGoogle(credentialResponse.credential);

            // Perform any additional actions based on the server response
            if (res.status === 200) {
                setLocalStorage('accessToken', res.data);
                navigate('/');
            } else {
                console.log('Google login failed:', res);
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '100vh', backgroundImage: `url(${BgAuth})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
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
                            <span className="pe-3">Bạn chưa có tài khoản?</span>
                            <Link to="/Register" className="btn btn-sm btn-outline-dark rounded-5 px-3">Đăng ký</Link>
                        </div>
                        <h2 className="fw-bold mt-3">Chào mừng trở lại!</h2>
                        <p>Đăng nhập vào tài khoản của bạn</p>
                        <form onSubmit={handleLogin} className="pt-3">
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label">Tên tài khoản</label>
                                <input type="text" className="form-control" id="usernameInput" aria-describedby="usernameError" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Mật khẩu</label>
                                <input type={showPassword ? 'text' : 'password'} className="form-control" id="passwordInput" aria-describedby="passwordError" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                                {passwordError && <div id="passwordError" className="text-danger small">*Mật khẩu không hợp lệ</div>}
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-3 form-check small">
                                <div>
                                    <input type="checkbox"
                                        className="form-check-input"
                                        id="rememberMeCheckbox"
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange} />
                                    <label className="form-check-label" htmlFor="rememberMeCheckbox">Lưu đăng nhập</label>
                                </div>
                                <div>
                                    <Link to="/ResetPassword">Quên mật khẩu?</Link>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <button type="submit" className="btn btn-dark px-5 py-2 rounded-5">Đăng nhập</button>
                            </div>
                            <hr></hr>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <GoogleOAuthProvider clientId={ClientId}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    ></GoogleLogin>
                                </GoogleOAuthProvider>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Login;