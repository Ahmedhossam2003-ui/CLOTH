import React, { useEffect, useState } from "react";
import { listProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Services from "../components/Services";
import Sales from "../components/Sales";

const HomeScreen = () => {
  let params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const categories = [
    "All",
    ...Array.from(new Set((products || []).map((p) => p.category))),
  ];
  const visible =
    category === "All"
      ? products || []
      : (products || []).filter((p) => p.category === category);

  return (
    <>
      <Meta title="ELHOSS CLOTHS | Home" />
      <Sales />
      <h3>Latest Products</h3>

      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "cat-btn active" : "cat-btn"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <Row>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          visible.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
      <Services />
    </>
  );
};

export default HomeScreen;
