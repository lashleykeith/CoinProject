import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = ({
  selectedTag,
  products,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  searchVal,
  coinMint,
  coinWeight,
  CoinYear,
  coinMetal,
  coinCollection,
  coinNovelty,
  onSale

}) => {
  return (
    <Fragment>
      {products.filter((val) => {
        if (searchVal == "") {
          return val;
        } else if (val.title.toLowerCase().includes(searchVal.toLowerCase())) {
          return val;
        }
      }).filter((val) => {
        if (coinMint == "none") {
          return val;
        } else if (val.mint.toLowerCase().includes(coinMint.toLowerCase())) {
          return val;
        }
      }).filter((val) => {
        if (CoinYear == 0) {
          return val;
        } else if (val.year.toLowerCase().includes(CoinYear)) {
          return val;
        }
      }).filter((val) => {
        if (coinWeight == "none") {
          return val;
        } else if (val.weight.toLowerCase().includes(coinWeight.toLowerCase())) {
          return val;
        }
      }).filter((val) => {
        if (coinMetal == "none") {
          return val;
        } else if (val.metal.toLowerCase().includes(coinMetal.toLowerCase())) {
          return val;
        }
      }).filter((val) => {
        if (coinCollection == "none") {
          return val;
        } else if (val.collection.toLowerCase().includes(coinCollection.toLowerCase())) {
          return val;
        }
      }).filter((val) => {
        if (coinNovelty == "none") {
          return val;
        } else if (val.commemorative.toLowerCase().includes(coinNovelty.toLowerCase())) {
          return val;
        }
      }).filter((val) => {
        if (onSale == false) {
          return val;
        } else if (val.discount_price > 0) {
          return val;
        }
      }).filter((val) => {
        if (selectedTag == { weight: "", metal: "", mint: "", year: "", collection: "", commemorative: "", novelty: "" }) {
          return val;
        } else if ((val.metal.toLowerCase().includes(selectedTag.metal.toLowerCase()) || selectedTag.metal == "none") && (val.mint.toLowerCase().includes(selectedTag.mint.toLowerCase()) || selectedTag.mint == "none") && (val.year.toLowerCase().includes(selectedTag.year) || selectedTag.year == "none") &&
          (val.weight.toLowerCase().includes(selectedTag.weight.toLowerCase()) || selectedTag.weight == "none") && (val.collection.toLowerCase().includes(selectedTag.collection.toLowerCase()) || selectedTag.collection == "none") && (val.commemorative.toLowerCase().includes(selectedTag.commemorative.toLowerCase()) || selectedTag.commemorative == "none") && (val.novelty.toLowerCase().includes(selectedTag.novelty.toLowerCase()) || selectedTag.novelty == "none")) {
          return val;
        }
      }).map(product => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter(cartItem => cartItem.id === product.id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                wishlistItem => wishlistItem.id === product.id
              )[0]
            }
            compareItem={
              compareItems.filter(
                compareItem => compareItem.id === product.id
              )[0]
            }
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
