import React, { Fragment } from "react";

const ProductCard = ({data,clickHandler}) => {

  const { productName, id, image: photo, price } = data;

  return (
    <Fragment key={id}>
      <div class="card m-2" style={{width: "18rem"}}>
        <img class="card-img-top" src={photo} alt="Product Images" />
        <div class="card-body">
          <h5 class="card-title">{productName}</h5>
          <p class="card-text">lorem</p>
          <p class="card-text">Rs.{price}</p>
          <button class="btn btn-primary" onClick={()=>{clickHandler(data)}}>
           Add to Cart
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
