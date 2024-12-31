import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-light d-flex align-items-center" style={{ height: '100vh', backgroundColor: 'green' }}>
        <Container>
          <Row className="align-items-center">
            
            <Col md={6} className="text-center">
              <img
                src="https://blogtaxdome.imgix.net/2023/05/Project-Task-Management-Software-scaled.jpg?auto=compress%2Cformat&ixlib=php-3.3.0&s=30c2ca4c23ce307757da65c126a59b9c"
                alt="Task Management Illustration"
                className="img-fluid"
              />
            </Col>

            <Col md={6} className="text-center text-md-start">
              <h1 className="display-4 fw-bold">Task Manager App</h1>
              <p className="lead" style={{ color: 'yellow' }}>Easily create, assign, organized, and track project tasks across your teams. Our task management software allows teams to prioritize tasks.</p>
              <Button variant="primary" size="lg" onClick={handleGetStarted}>
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
