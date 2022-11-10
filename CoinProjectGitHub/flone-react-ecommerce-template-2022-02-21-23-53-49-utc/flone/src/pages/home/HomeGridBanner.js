import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import LayoutThree from "../../layouts/LayoutThree";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";

const HomeGridBanner = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Fine Bullions | Home</title>
        <meta
          name="description"
          content="Grid banner home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutThree
        headerTop="visible"
        headerContainerClass="container-fluid"
        headerBorderStyle="fluid-border"
        headerPaddingClass="header-padding-2"
      >
        {/* grid banner */}
        <div className="product-area hm6-section-padding pb-80">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/3116779167_20b155ba44_b.jpg"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/bars.jpg"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/goldcoins.jpg"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/goldsilverbullion.jpg"
                      }
                      alt=""
                    />
                  </Link>

                </div>
              </div>
              <div className="col-lg-3">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/goldbars.jpg"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/goldbarsandcoins.jpg"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/bars.jpg"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product-wrap-4 mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/metals/100259160-gold_bars_1_gettyp.1910x1000-669505279.png"
                      }
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* newsletter */}
        <NewsletterTwo spaceBottomClass="pb-100" />
      </LayoutThree>
    </Fragment>
  );
};

export default HomeGridBanner;
