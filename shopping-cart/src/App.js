import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("https://5cdd0a92b22718001417c19d.mockapi.io/api/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData([...data]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  const addProduct = (product) => {
    setCartList([...cartList, product]);
    setTotalPrice((prevState) => prevState + product.price);
  };

  const removeProduct = (product, index) => {
    let updateCart = cartList.filter(
      (list, indexValue) => indexValue !== index
    );
    console.log(updateCart);
    setCartList([...updateCart]);
    setTotalPrice((prevState) => prevState - product.price);
  };

  return (
    <>
      {!loader ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-9">
              <div className="justify-content-md-center row">
                {data.map((product) => {
                  return (
                    <Fragment key={product.id}>
                      <ProductCard data={product} clickHandler={addProduct} />
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-3">
              {cartList.map((list, index) => {
                return (
                  <React.Fragment key={index}>
                    <ul class="list-group">
                      <li class="list-group-item">
                        {list.productName}{" "}
                        <span>
                          <button
                            onClick={() => {
                              removeProduct(list, index);
                            }}
                            className=""
                            style={{
                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                              float: "right",
                              background: "blue",
                            }}
                          ></button>
                        </span>
                      </li>

                      <li class="list-group-item">Rs.{list.price}</li>
                    </ul>
                  </React.Fragment>
                );
              })}
              {!(totalPrice === 0) && totalPrice >= 0 && (
                <h3 className="h3 mt-2 ml-1"> Total - Rs {totalPrice}</h3>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </>
  );
}

export default App;
