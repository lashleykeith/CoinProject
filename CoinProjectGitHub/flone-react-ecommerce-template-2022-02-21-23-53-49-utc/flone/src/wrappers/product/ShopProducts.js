import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({
  selectedTag,
  products,
  layout,
  searchVal,
  CoinYear,
  coinMint,
  coinMetal,
  coinCollection,
  coinWeight,
  coinNovelty,
  setOnSale,
  onSale

}) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList
          setOnSale={setOnSale}
          onSale={onSale}
          selectedTag={selectedTag}
          coinWeight={coinWeight}
          products={products}
          spaceBottomClass="mb-25"
          searchVal={searchVal}
          CoinYear={CoinYear}
          coinMetal={coinMetal}
          coinCollection={coinCollection}
          coinMint={coinMint}
          coinNovelty={coinNovelty}
        />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;
