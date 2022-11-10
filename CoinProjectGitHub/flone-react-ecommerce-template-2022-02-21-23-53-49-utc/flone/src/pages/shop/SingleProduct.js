import React, { useEffect, useState } from 'react';

export const SingleProduct = ({
    product,
    onAddToWish,
    onAddToCart,
    addedInCart,
}) => {
    const { title, oldPrice, price, image, is_sale, isNew, id } = product;

    const [hasImageUrl, setHasImageUrl] = useState(false)

    useEffect(() => {

        if (image.includes("http") || image.includes("data:")) {
            setHasImageUrl(true)
        } else {
            setHasImageUrl(false)
        }
    }, []);

    return (
        <>
            {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
            <div className='products-item'>
                <div className='products-item__type'>
                    {is_sale && <span className='products-item__sale'>sale</span>}
                    {isNew && <span className='products-item__new'>new</span>}
                </div>
                <div className='products-item__img'>
                    {hasImageUrl ? (
                        <img src={image} className='js-img' alt='' />
                    ) : (
                        <img src={`http://localhost:8000/api/ambassador/image/${id}`} className='js-img' alt='' />
                    )}
                    <div className='products-item__hover'>
                        {/* <Link href={`/product/${id}`}> */}
                        <a>
                            <i className='icon-search'></i>
                        </a>
                        {/* </Link> */}
                        <div className='products-item__hover-options'>
                            <button className='addList' onClick={() => onAddToWish(id)}>
                                <i className='icon-heart'></i>
                            </button>
                            <button
                                disabled={addedInCart}
                                className={`addList ${addedInCart ? 'added' : ''}`}
                                onClick={() => onAddToCart(id)}
                            >
                                <i className='icon-cart'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='products-item__info'>
                    {/* <Link href={`/product/${id}`}> */}
                    <a>
                        <span className='products-item__name'>{title}</span>
                    </a>
                    {/* </Link> */}
                    <span className='products-item__cost'>
                        <span>{oldPrice && `$${oldPrice}`}</span> ${price}
                    </span>
                </div>
            </div>
            {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
        </>
    );
};
