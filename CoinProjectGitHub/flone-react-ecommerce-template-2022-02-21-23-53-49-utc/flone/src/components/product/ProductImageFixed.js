import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const ProductImageFixed = ({ product }) => {

  const [hasImageUrl, setHasImageUrl] = useState(false)

  useEffect(() => {
    if (product.image.includes("http") || product.image.includes("data:")) {
      setHasImageUrl(true)
    } else {
      setHasImageUrl(false)
    }
  }, []);

  return (
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

      <div className="product-fixed-image">

        {hasImageUrl ? (
          <img src={product.image} className='js-img' alt='' />
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
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
