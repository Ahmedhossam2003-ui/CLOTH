import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";

const items = [
  { icon: "fas fa-truck", title: "Free Shipping", text: "On orders over $50", details: "Free standard shipping on every order over $50. Delivery in 3-5 business days." },
  { icon: "fas fa-undo", title: "Easy Returns", text: "30-day return policy", details: "Not happy? Return any item within 30 days for a full refund." },
  { icon: "fas fa-headset", title: "24/7 Support", text: "We're always here", details: "Our support team is available around the clock to help you." },
  { icon: "fas fa-lock", title: "Secure Payment", text: "PayPal & cards", details: "All payments are encrypted and processed securely." },
];

const Services = () => {
  const [active, setActive] = useState(null);
  return (
    <>
      <Row className="text-center my-5">
        {items.map((s) => (
          <Col key={s.title} md={3} sm={6} className="mb-4">
            <div className="service-box" style={{ cursor: "pointer" }} onClick={() => setActive(s)}>
              <i className={`${s.icon} fa-2x mb-3`} style={{ color: "#6c5ce7" }}></i>
              <h5>{s.title}</h5>
              <p className="text-muted mb-0">{s.text}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Modal show={!!active} onHide={() => setActive(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{active && active.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{active && active.details}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setActive(null)}>Got it</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Services;
