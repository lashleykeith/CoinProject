import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [hasImageUrl, setHasImageUrl] = useState(false)

  // effect for swiper slider synchronize
  useEffect(() => {
    console.log(product);
    // if (product.image.includes("http") || product.image.includes("data:")) {
    //   setHasImageUrl(true)
    // } else {
    //   setHasImageUrl(false)
    // }

    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount ? (
              <span className="pink">-{product.discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {product.image &&
              product.image.map((single, key) => {
                return (
                  <div key={key}>
                    {hasImageUrl ? (
                      <LightgalleryItem
                        group="any"
                        src={single}
                      >
                        <button>
                          <i className="pe-7s-expand1"></i>
                        </button>
                      </LightgalleryItem>
                    ) : (
                      <LightgalleryItem
                        group="any"
                        src={`http://localhost:8000/api/ambassador/image/${product.id}`}

                      >
                        <button>
                          <i className="pe-7s-expand1"></i>
                        </button>
                      </LightgalleryItem>

                    )}
                    <div className="single-image">
                      {hasImageUrl ? (
                        <img src={single} className='h-25' alt='' />
                      ) : (
                        <img
                          className="default-img"
                          src={`http://localhost:8000/api/ambassador/image/${product.id}`}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        <div className="div-img">
          {hasImageUrl ? (
            <img src={product.faceImage} className='h-25' alt='' />
          ) : (
            <img
              width={300}
              src={`http://localhost:8000/api/ambassador/image/${product.id}`}
              alt=""
            />
          )}
        </div>
        <br></br>
        <div className="div-img">
          {hasImageUrl ? (
            <img src={product.backImage} className='h-25' alt='' />
          ) : (
            <img
              width={300}
              src={`http://localhost:8000/api/ambassador/back-img/${product.id}`}
              alt=""
            />
          )}
        </div>
      </div>
    </Fragment >
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallery;
