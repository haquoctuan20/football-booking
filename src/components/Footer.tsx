import { FaFacebookSquare, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LOGO from "../assets/Logo.jpg";

const Footer = () => {
  return (
    <WrapperFooter>
      <div className="footer-content pt-3">
        <div className="footer-logo">
          {/* <img src="logo.png" alt="Logo" className="logo"> */}
          <img src={LOGO} alt="logo" className="main-logo" />
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li>
              <Link to={"/"}>Dịch vụ</Link>
            </li>
            <li>
              <Link to={"/"}>Liên hệ</Link>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="#" className="social-icon">
            <FaFacebookSquare />
          </a>
          <a href="#" className="social-icon">
            <FaTiktok />
          </a>
          <a href="#" className="social-icon">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="footer-bottom pt-2">
        <p>&copy; 2023 Your Website. All Rights Reserved.</p>
      </div>
    </WrapperFooter>
  );
};

export default Footer;

const WrapperFooter = styled.footer`
  background-color: #030303;
  color: #969696;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .logo-text {
    font-size: 20px;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .footer-links li {
    margin-right: 20px;
  }

  .footer-links a {
    text-decoration: none;
    color: #969696;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #fff;
    }
  }

  .footer-social {
    display: flex;
  }

  .social-icon {
    margin-left: 30px;
    color: #969696;
    font-size: 20px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #fff;
    }
  }

  .footer-bottom {
    text-align: center;
    padding-bottom: 10px;
  }

  .footer-bottom p {
    margin: 0;
  }

  .main-logo {
    max-width: 220px;
    border-radius: 8px;
  }
`;
