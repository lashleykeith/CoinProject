import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { setActiveSort } from "../../helpers/product";
import axios from "axios";

const ShopTag = ({ getSortParams, setSelectedTags }) => {

  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/alltags`).then((res) => {
      setTags(res.data);
      console.log(res.data)

    }).catch((err) => {
      if (err) {

        console.log(err)
      }
    })
  }, []);

  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tags </h4>
      <div className="sidebar-widget-tag mt-25">
        {tags ? (
          <ul>
            <li>
              <button
                onClick={e => {
                  setActiveSort(e);
                  setSelectedTags({ weight: "", metal: "", mint: "", year: "", collection: "", commemorative: "", novelty: "" })
                }}
              >
                Deselect
              </button>
            </li>
            {tags.map((tag, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={e => {
                      setActiveSort(e);
                      setSelectedTags(tag)
                    }}
                  >
                    {tag.tagname}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No tags found"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array
};

export default ShopTag;
