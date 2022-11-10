import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualTags,
} from "../../helpers/product";
import ShopCategories from "../../components/product/ShopCategories";
import ShopTag from "../../components/product/ShopTag";

const ShopSidebar = ({
  products,
  getSortParams,
  sideSpaceClass,
  setSearch,
  setCoinYear,
  coinWeight,
  setCoinWeight,
  thisYear,
  coinYear,
  setCoinMetal,
  coinMetal,
  setCoinCollection,
  coinCollection,
  setCoinMint,
  coinMint,
  setCoinNovelty,
  coinNovelty, 
  setSelectedTags,
  setOnSale,
  onSale
}) => {
  const uniqueTags = getIndividualTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-50 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input type="text" placeholder="Search here..." onChange={e => {
              setSearch(e.target.value)
            }} />
          </form>
        </div>
      </div>

      {/* filter by categories */}
      <ShopCategories
        getSortParams={getSortParams}
        setCoinWeight={setCoinWeight}
        coinWeight={coinWeight}
        thisYear={thisYear}
        setCoinYear={setCoinYear}
        selectedYear={coinYear}
        setCoinMetal={setCoinMetal}
        coinMetal={coinMetal}
        setCoinCollection={setCoinCollection}
        coinCollection={coinCollection}
        setCoinMint={setCoinMint}
        coinMint={coinMint}
        setCoinNovelty={setCoinNovelty}
        coinNovelty={coinNovelty}
        setOnSale={setOnSale}
        onSale={onSale}
      />

      {/* filter by tag */}
      <ShopTag getSortParams={getSortParams} setSelectedTags={setSelectedTags} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
