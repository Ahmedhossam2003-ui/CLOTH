import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const deals = [
  { title: "Hoodies Sale", off: "30% OFF", keyword: "hoodie", color: "#6c5ce7" },
  { title: "Nike Week", off: "20% OFF", keyword: "nike", color: "#e17055" },
  { title: "Adidas Deals", off: "25% OFF", keyword: "adidas", color: "#00b894" },
];

const useCountdown = (hours) => {
  const [left, setLeft] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const p = (n) => String(n).padStart(2, "0");
  return `${p(Math.floor(left / 3600))}:${p(Math.floor((left % 3600) / 60))}:${p(left % 60)}`;
};

const Sales = () => {
  const time = useCountdown(12);
  return (
    <div className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">🔥 Hot Sales</h3>
        <span className="sale-timer">Ends in {time}</span>
      </div>
      <Row>
        {deals.map((d) => (
          <Col key={d.title} md={4} className="mb-3">
            <div className="sale-card" style={{ background: d.color }}>
              <h2>{d.off}</h2>
              <p>{d.title}</p>
              <Button as={Link} to={`/search/${d.keyword}`} variant="light" size="sm">
                Shop Now
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Sales;
