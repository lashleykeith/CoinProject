import PropTypes from "prop-types";
import React, { useState } from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({
  selectedYear,
  setCoinYear,
  thisYear,
  coinWeight,
  setCoinWeight,
  setCoinMetal,
  coinMetal,
  setCoinCollection,
  coinCollection,
  setCoinMint,
  coinMint,
  setCoinNovelty,
  coinNovelty,
  setOnSale,
  onSale

}) => {

  const options = [];

  for (let i = 0; i <= 60; i++) {
    const year = thisYear - i;
    options.push(<option value={year}>{year}</option>);
  }

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        <ul>
          <li>
            <h5>Coin Year</h5>
            <select value={selectedYear} onChange={e => { setCoinYear(e.target.value); }}>
              <option selected="selected" value={0}>None</option>
              {options}
            </select>
          </li>
          <br />
          <li>
            <h5>Coin Mint</h5>
            <input type="text" placeholder="coin mint" value={coinMint} onChange={e => { setCoinMint(e.target.value); }} />
          </li>
          <br />
          <li>
            <h5>Coin Weight</h5>
            <input type="text" placeholder="coin weight" value={coinWeight} onChange={e => { setCoinWeight(e.target.value); }} />
          </li>
          <br />
          <li>
            <h5>Coin Metal</h5>
            <select value={coinMetal} onChange={e => { setCoinMetal(e.target.value); }}>
              <option selected="selected" value={"none"}>None</option>
              <option value={"gold"}>Gold</option>
              <option value={"silver"}>Silver</option>
              <option value={"platinum"}>Platinum</option>
              <option value={"palladium"}>Palladium</option>
            </select>
          </li>
          <br />
          <li>
            <h5>Coin Collection</h5>
            <select value={coinCollection} onChange={e => { setCoinCollection(e.target.value); }}>
              <option selected="selected" value={"none"}>None</option>
              <option value={"American Eagle"}>American Eagle</option>
              <option value={"American Buffalo"}>American Buffalo</option>
              <option value={"Maple Leaf"}>Maple Leaf</option>
              <option value={"Kennedy Half Dollars"}>Kennedy Half Dollars</option>
            </select>
          </li>
          <br />
          <li>
            <h5>Coin Novelty</h5>
            <input type="text" placeholder="coin novelty" value={coinNovelty} onChange={e => { setCoinNovelty(e.target.value); }} />
          </li>
          <br />
          <li>
            <h5>On sale</h5>
            <input type="checkbox" className="checkboxShop" value={onSale} onChange={e => { setOnSale(e.target.checked); }} />
          </li>
        </ul>
      </div>
    </div>
  );
};



export default ShopCategories;
