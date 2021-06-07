import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Cart.css";

function Cart() {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const check_if_auth = async () => {
      await axios
        .get("/api/react/get_cart_products?key=no2$gold")
        .then((res) => {
          setCartData(res.data);
          console.log(res.data);
        });
    };
    check_if_auth();
  }, []);

  const DeleteCartItem = async (id) => {
    await axios
      .get("/api/react/delete_item_cart?key=no2$gold&id=" + id)
      .then((res) => {
        window.location.reload();
      });
  };

  return (
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
              <button
                onClick={() => DeleteCartItem(item?.id)}
                className="btn btn-danger cart__delete-btn"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartData.length === 0 ? (
        <div className="conatainer-fluid">
          <h1>
            No Products in Cart ?..{" "}
            <span>
              <a href="/">Try Adding Some</a>
            </span>
          </h1>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
