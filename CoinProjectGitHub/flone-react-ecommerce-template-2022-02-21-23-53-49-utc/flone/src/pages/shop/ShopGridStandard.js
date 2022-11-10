import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import axios from "axios";

const ShopGridStandard = ({ location, products }) => {
    axios.defaults.withCredentials = true;
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const [search, setSearch] = useState("")
    const [coinYear, setCoinYear] = useState(0)
    const [thisYear, setThisYear] = useState((new Date()).getFullYear())

    const [coinMetal, setCoinMetal] = useState("")
    const [coinWeight, setCoinWeight] = useState("")
    const [coinCollection, setCoinCollection] = useState("")
    const [coinMint, setCoinMint] = useState("")
    const [coinNovelty, setCoinNovelty] = useState("")
    const [onSale, setOnSale] = useState(false)

    const [selectedTag, setSelectedTag] = useState({ weight: "", metal: "", mint: "", year: "", collection: "", commemorative: "", novelty: "" })

    const pageLimit = 15;
    const { pathname } = location;

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/products/frontend`).then((res) => {
            setCurrentData(res.data);
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })

        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        <Fragment>
            <MetaTags>
                <title>Fine Bullions | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar products={products}
                                    setCoinWeight={setCoinWeight}
                                    coinWeight={coinWeight}
                                    setCoinMetal={setCoinMetal}
                                    coinMetal={coinMetal}
                                    coinYear={coinYear}
                                    setCoinYear={setCoinYear}
                                    thisYear={thisYear}
                                    getSortParams={getSortParams}
                                    setSearch={setSearch}
                                    setCoinCollection={setCoinCollection}
                                    coinCollection={coinCollection}
                                    setCoinMint={setCoinMint}
                                    coinMint={coinMint}
                                    setCoinNovelty={setCoinNovelty}
                                    coinNovelty={coinNovelty}
                                    setOnSale={setOnSale}
                                    onSale={onSale}
                                    setSelectedTags={setSelectedTag}
                                    sideSpaceClass="mr-30"
                                />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout}
                                    selectedTag={selectedTag}
                                    products={currentData}
                                    searchVal={search}
                                    coinWeight={coinWeight}
                                    CoinYear={coinYear}
                                    coinMetal={coinMetal}
                                    coinCollection={coinCollection}
                                    coinMint={coinMint}
                                    coinNovelty={coinNovelty}
                                    onSale={onSale}
                                />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = state => {
    return {
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(ShopGridStandard);