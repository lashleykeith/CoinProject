import PropTypes from "prop-types";
import React from "react";

const Newsletter = ({
  bgColorClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass
}) => {
  return (
    <div
      className={`subscribe-area ${bgColorClass ? bgColorClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        } ${spaceLeftClass ? spaceLeftClass : ""}  ${spaceRightClass ? spaceRightClass : ""
        }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 ml-auto mr-auto">
            <div className="subscribe-style-2 text-center">
              <h2>Subscribe </h2>
              <p>Subscribe to our newsletter to receive news on update</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Newsletter.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default Newsletter;
