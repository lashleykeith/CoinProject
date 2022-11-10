import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";

const FooterTwo = ({
  backgroundColorClass,
  copyrightColorClass,
  spaceLeftClass,
  spaceRightClass,
  footerTopBackgroundColorClass,
  footerTopSpaceTopClass,
  footerTopSpaceBottomClass,
  footerLogo,
  backgroundImage
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer
      className={`footer-area ${backgroundColorClass ? backgroundColorClass : ""
        } ${spaceLeftClass ? spaceLeftClass : ""} ${spaceRightClass ? spaceRightClass : ""
        } ${backgroundImage ? "bg-img" : ""}`}
      style={{
        backgroundImage: ` ${backgroundImage
          ? `url(${process.env.PUBLIC_URL + backgroundImage})`
          : `url()`
          }`
      }}
    >
      <div
        className={`footer-top text-center ${footerTopBackgroundColorClass ? footerTopBackgroundColorClass : ""
          } ${footerTopSpaceTopClass ? footerTopSpaceTopClass : ""}  ${footerTopSpaceBottomClass ? footerTopSpaceBottomClass : ""
          }`}
      >
        <div className="container">
          <div className="footer-logo">
            <Link to={process.env.PUBLIC_URL}>
              <h4>Fine Bullions</h4>
            </Link>
          </div>
          <div>
            <p>
              MAJOR PAYMENT METHODS ACCEPTED:
            </p>
            <img src={process.env.PUBLIC_URL + "assets/img/creditCards/creditCards.png"} />
          </div>
          <br />
          <div className="footer-social">
            <ul>
              <li>
                <a href="//www.facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="//www.dribbble.com">
                  <i className="fa fa-dribbble" />
                </a>
              </li>
              <li>
                <a href="//www.pinterest.com">
                  <i className="fa fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="//www.twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="//www.linkedin.com">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <div className="container">
          <div
            className={`copyright-2 ${copyrightColorClass ? copyrightColorClass : ""
              }`}
          >
            <p>
              © 2022 Fine Bullions LLC. All rights reserved
            </p>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterTwo.propTypes = {
  backgroundColorClass: PropTypes.string,
  copyrightColorClass: PropTypes.string,
  footerLogo: PropTypes.string,
  backgroundImage: PropTypes.string,
  footerTopBackgroundColorClass: PropTypes.string,
  footerTopSpaceBottomClass: PropTypes.string,
  footerTopSpaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterTwo;
