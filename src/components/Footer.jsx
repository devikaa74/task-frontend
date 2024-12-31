import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4" style={{ marginBottom: '0' }}>
      <Container className="text-center">
        <small>&copy; {new Date().getFullYear()} Task Management App. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
