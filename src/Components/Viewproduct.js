import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./styles/Viewproduct.css";

function ShowSuggestions({ suggestions }) {
  return (
    <div className="homepage__products">
      {suggestions.map((item) => (
        <div className="card" style={{ width: "18rem" }}>
          <a href={`/products/view/${item?.url_slug}#show`}>
            <img
              src={item?.picture_url}
              className="card-img-top homepage__product-image"
              alt=""
            />
          </a>
          <div className="card-body">
            <h5 className="card-title">{item?.name}</h5>
            <p className="card-text">₹ {item?.price}</p>
            <h6 className="card-text">Company: {item?.company}</h6>
            <a
              href={`/products/view/${item?.url_slug}#show`}
              className="btn btn-primary"
            >
              View More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function Viewproduct() {
  const [product, setProduct] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  let { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/react/get_product_by_slug?key=no2$gold&slug=` + slug)
        .then(async (res) => {
          setProduct(res.data[0]);
          await axios
            .get(
              "/api/react/get_products_by_category?key=no2$gold&query=" +
                res.data[0].category
            )
            .then((res) => {
              setSuggestions(res.data);
            });
        });
    };
    fetchData();
  }, [slug]);

  const CartClicked = async () => {
    await axios
      .get("/api/react/check_is_auth?key=no2$gold")
      .then(async (res) => {
        if (res.data?.auth === true) {
          await axios
            .get(
              "/api/react/add_product_cart?key=no2$gold&product_pk=" +
                product.url_slug
            )
            .then((res) => {
              alert("Product Added To Cart");
            });
        } else {
          window.location = "http://localhost:8000/login";
        }
      });
  };

  return (
    <div className="viewproduct">
      <div
        id="show"
        className="card mb-3 viewproduct__card"
        style={{ maxWidth: "100%" }}
      >
        <div className="row g-0 viewproduct__jumbotron">
          <div className="col-md-4">
            <img
              src={product?.picture_url}
              alt="..."
              className="viewproduct__pic"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{product?.name}</h1>
              <h2 className="card-text">₹ {product?.price}</h2>
              <br />
              <h4 className="card-text">{product?.description}</h4>
              <h6 className="card-text">
                <small className="text-muted">
                  Company: {product?.company}
                </small>
              </h6>
              <h6 className="card-text">
                <small className="text-muted">
                  Category: {product?.category}
                </small>
              </h6>
              <br />
              <button
                onClick={() => CartClicked()}
                className="btn btn-success btn-lg"
              >
                ➕🛒 Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1>Check out other {product?.category} Items</h1>
      <br />
      <ShowSuggestions suggestions={suggestions} />
    </div>
  );
}

export default Viewproduct;
