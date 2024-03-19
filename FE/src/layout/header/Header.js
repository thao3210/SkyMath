import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import vietnamFlag from '../../assets/images/VIETNAM.png'
import ukFlag from '../../assets/images/UK.png'
import logo from '../../assets/images/LogoSkyMath.png'
import { clearLocalStorage, getLocalStorage } from "../../services/agent";
import UserService from "../../services/UserService";

const Header = () => {
  const navigate = useNavigate();
  const [isSticky, setSticky] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const handleLoginSuccess = async () => {
    try {
      const accessTokenFromSession = sessionStorage.getItem("accessToken");

      // Kiểm tra xem có AccessToken trong LocalStorage không
      const accessTokenFromLocalStorage = getLocalStorage("accessToken");

      const googleAccessToken = getLocalStorage("googleAccessToken");

      if (accessTokenFromLocalStorage || accessTokenFromSession || googleAccessToken) {
        setLoggedIn(true);
        await (fetchUserInfo());
        // setUserInfo(fetchUserInfo());
      } else {
        console.error(
          "Không tìm thấy AccessToken trong Cookie hoặc LocalStorage"
        );
      }
    } catch (error) {
      console.error("Đăng nhập không thành công", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await UserService.getUserInformation();
      if (response.status === 200) {
        setUserInfo(response.data);
      } else {
        console.error("Error user info response status", response.status)
      }
    } catch (err) {
      console.error(err.message);
    }
  }


  const handleLogout = () => {
    // Clear user data and perform any additional cleanup
    setLoggedIn(false);
    setUserInfo({});
    // document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem("accessToken");
    clearLocalStorage();
    // Redirect to the login page (adjust the path as needed)
    navigate("/Login");
  };

  useEffect(() => {
    handleLoginSuccess();
  }, []);

  const handleScroll = () => {
    // Set the sticky state based on the scroll position
    setSticky(window.scrollY > 80);
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <div className="px-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between py-2 header">
            <div className='d-flex align-items-center'>
              <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
                <img src={logo} className='logo' alt='sample' />
              </Link>
              <div className="d-lg-flex gap-2 px-2 d-md-none d-sm-none d-none align-items-center">
                <Link to="/" className="text-primary fw-bold text-decoration-none">Thông báo</Link>
                <div className="text-primary fs-5">|</div>
                <Link to="/NewsAndEvent" className="text-primary fw-bold text-decoration-none">Tin tức</Link>
              </div>
            </div>

            <div className="d-lg-flex d-md-none d-sm-none d-none align-items-center ">
              <button className="btn border-0 rounded-start-5 z-3" style={{ marginRight: '-46px' }}><i className="fa-solid fa-magnifying-glass"></i></button>
              <input type="text" placeholder="Tìm kiếm khóa học..." className="form-control border-dark m-0 rounded-5 search-input ps-5"></input>
              <button className="btn border-0 rounded-end-5 z-3 " style={{ marginLeft: '-40px' }}><i className="fa-solid fa-microphone"></i></button>
            </div>

            <div className='d-lg-flex gap-2 d-lg-flex d-md-none d-sm-none d-none align-items-center pe-3'>
              <Link to="/" className="text-primary text-decoration-none"><img src={vietnamFlag} className='languageImg' alt='sample' /></Link>
              <Link to="/" className="text-primary text-decoration-none"><img src={ukFlag} className='languageImg' alt='sample' /></Link>


              {isLoggedIn ? (
                <>
                  <button className="btn border-0 dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="position-relative">
                      <img src={userInfo.avatar} alt="avatar" className="border rounded-circle object-fit-cover avatar"></img>
                      <span className="position-absolute translate-middle p-1 rounded-circle avatar-badge" style={{ top: '30px', right: '-3px' }}></span>
                    </div>
                    <span className="text-primary fw-bold ps-1">{userInfo.fullName}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-md-end">
                    <li><Link to="/Profile" className="dropdown-item">Cá nhân</Link></li>
                    <li><button onClick={handleLogout} className="dropdown-item">Đăng xuất</button></li>
                  </ul>
                </>
              ) : (
                <>
                  <Link to="/Login" className="text-primary fw-bold text-decoration-none">Đăng nhập</Link>
                  <div className="text-primary fs-5">|</div>
                  <Link to="/Register" className="text-primary fw-bold text-decoration-none">Đăng ký</Link>
                </>
              )}
            </div>

            <button className="btn fs-5 d-lg-none d-md-block d-sm-block d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar"
              aria-controls="offcanvasSidebar">
              <i className="fa-solid fa-bars" ></i>
            </button>
          </div>
          <div className="d-lg-none d-md-flex d-sm-flex d-flex align-items-center pb-2 px-3">
            <button className="btn border-0 rounded-start-5 z-3" style={{ marginRight: '-46px' }}><i className="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" placeholder="Tìm kiếm khóa học..." className="form-control border-dark m-0 rounded-5 search-input ps-5"></input>
            <button className="btn border-0 rounded-end-5 z-3 " style={{ marginLeft: '-40px' }}><i className="fa-solid fa-microphone"></i></button>
          </div>

        </div>

        <nav className={`navbar navbar-expand-lg bg-primary d-lg-flex d-md-none d-sm-none d-none z-3 ${isSticky ? 'sticky-navbar' : ''}`}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse align-items-center justify-content-end pe-3" id="navbarNav">
              <ul className="navbar-nav gap-3">
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white text-uppercase d-flex align-items-center"><i className="fa-solid fa-home pe-2"></i><span>Trang chủ</span></Link>
                </li>
                <li className="nav-item">
                  <Link to="/About" className="nav-link text-white text-uppercase">Giới thiệu</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Course" className="d-flex align-items-center nav-link text-white text-uppercase">Khóa học</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Achievement" className="d-flex align-items-center nav-link text-white text-uppercase">Bảng thành tích</Link>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link text-white text-uppercase" type="button" data-bs-toggle="dropdown" aria-expanded="false">Kho tài liệu<i className="fa-solid fa-angle-down ps-1"></i></span>
                  <ul className="dropdown-menu" style={{ marginTop: '1px' }}>
                    <li><Link to="/Exams" className="dropdown-item text-uppercase py-1">Đề thi</Link></li>
                    <li><Link to="/Books" className="dropdown-item text-uppercase py-1">Sách</Link></li>
                    <li><Link to="/Documents" className="dropdown-item text-uppercase py-1">Tài liệu</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/Admissions" className="nav-link text-white text-uppercase">Tuyển sinh</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Contact" className="nav-link text-white text-uppercase">Liên hệ</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="offcanvas offcanvas-start bg-light" tabIndex="-1" id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel" style={{ width: '300px' }}>
        <div className="offcanvas-header">
          <Link to="/" className="d-inline-flex ms-4">
            <img src={logo} alt="logo" className="object-fit-contain logo-sidebar" />
          </Link>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0 pt-3">
          <div className="d-flex flex-column align-items-center">
            <Link to="/" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Trang chủ</Link>
            <Link to="/About" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Giới thiệu</Link>
            <Link to="/Course" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Khóa học</Link>
            <Link to="/Achievement" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Bảng thành tích</Link>
            <div className="w-100">
              <button
                className="btn btn-toggle rounded border-0 w-100 text-center collapsed  fs-5 align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#document-collapse"
                aria-expanded="false"
              >
                <span>Kho tài liệu</span>
                <i className="fa-solid fa-angle-down ps-1"></i>
              </button>
              <div className="collapse" id="document-collapse">
                <ul className="btn-toggle-nav list-unstyled text-center pb-1">
                  <li className="py-1"><Link to="/Exams" className="link-body-emphasis text-decoration-none rounded">Đề thi</Link></li>
                  <li className="py-1"><Link to="/Books" className="link-body-emphasis text-decoration-none rounded">Sách</Link></li>
                  <li className="py-1"><Link to="/Documents" className="link-body-emphasis text-decoration-none rounded">Tài liệu</Link></li>
                </ul>
              </div>
            </div>
            <Link to="/Admissions" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Tuyển sinh</Link>
            <Link to="/Contact" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Liên hệ</Link>
            <Link to="/NewsAndEvent" className="btn btn-light rounded-0 w-100 py-2 text-capitalize text-center fs-5">Tin tức</Link>
          </div>
        </div>
        <div className="d-flex  align-items-center justify-content-between px-2 pb-3">
          {isLoggedIn ? (
            <>
              <div className="btn-group dropup">
                <button type="button" className="btn border-0 dropdown-toggle" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img src={userInfo.avatar} alt="avatar" className="border rounded-circle object-fit-cover avatar"></img>
                  <span className="px-1"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><Link to="/Profile" className="dropdown-item">Cá nhân</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-item">Đăng xuất</button></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="btn-group dropup">
                <button type="button" className="btn border-0 dropdown-toggle" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <span className="btn btn-white rounded-circle fs-5 border border-0">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <span className="px-1"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><Link to="/Login" className="dropdown-item">Đăng nhập</Link></li>
                  <li><Link to="/Register" className="dropdown-item">Đăng ký</Link></li>
                </ul>
              </div>
            </>
          )}
          <div className="d-flex gap-1">
            <Link to="/" className="text-primary text-decoration-none"><img src={vietnamFlag} className='object-fit-contain language-img-sidebar' alt='sample' /></Link>
            <Link to="/" className="text-primary text-decoration-none"><img src={ukFlag} className='object-fit-contain language-img-sidebar' alt='sample' /></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
