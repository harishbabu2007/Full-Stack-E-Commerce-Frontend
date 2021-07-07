import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Checkout.css";
import Purchased from "./Purchased";

function CheckoutComponent({ change_bool }) {
  const [cartData, setCartData] = useState([]);
  const [price, setPrice] = useState(0);

  const Purchase_clicked = async () => {
    await axios.get("/api/react/purchase_items?key=no2$gold").then((res) => {
      change_bool(false);
    });
  };

  useEffect(() => {
    const check_if_auth = async () => {
      await axios.get("/api/react/check_is_auth?key=no2$gold").then((res) => {
        if (res.data.auth !== true) {
          window.location = "/";
        }
      });
    };

    const getCartData = async () => {
      await axios
        .get("/api/react/get_cart_products?key=no2$gold")
        .then(async (res) => {
          if (res.data?.length === 0) {
            window.location = "/view/action/cart";
          }
          setCartData(res.data);
        });
    };

    const get_cart_price = async () => {
      await axios.get("/api/react/get_cart_price?key=no2$gold").then((res) => {
        setPrice(res.data?.price);
      });
    };

    check_if_auth();
    getCartData();
    get_cart_price();
  }, []);

  return (
    <div className="checkout">
      <h1 className="text-center">Check out Page</h1>
      <div className="checkout__btn_back">
        <a href="/view/action/cart" className="btn btn-success">
          Go Back To Cart 🔙
        </a>
      </div>
      <div className="homepage">
        <div className="homepage__products">
          {cartData.map((item) => (
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={item?.picture_url}
                className="card-img-top homepage__product-image"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">{item?.name}</h5>
                <p className="card-text">₹ {item?.price}</p>
                <h6 className="card-text">Company: {item?.company}</h6>
                <Link
                  to={`/products/view/${item?.url_slug}#show`}
                  className="btn btn-primary"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <div className="card" style={{ width: "100%", height: "auto" }}>
          <div className="card-body">
            <h2 className="card-title">Final Recipt</h2>
            <br />
            {cartData.map((item) => (
              <div className="checkout__rec">
                <div>
                  <h4 className="card-text">{item?.name}</h4>
                </div>
                <div>
                  <h4 className="card-text">₹ {item?.price}</h4>
                </div>
              </div>
            ))}
            <div className="checkout__rec checkout__green">
              <div>
                <h4 className="card-text">Total</h4>
              </div>
              <div>
                <h4 className="card-text">₹ {price}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        style={{
          width: "100%",
          borderRadius: "none",
          height: "80px",
          fontSize: "25px",
        }}
        className="btn btn-success"
        onClick={() => Purchase_clicked()}
      >
        Purchase Items 🛒💳
      </button>
    </div>
  );
}

function Checkout() {
  const [is_checkout, setIs_Checkout] = useState(true);

  return (
    <div>
      {is_checkout ? (
        <CheckoutComponent change_bool={setIs_Checkout} />
      ) : (
        <Purchased />
      )}
    </div>
  );
}

export default Checkout;
