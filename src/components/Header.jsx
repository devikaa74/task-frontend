import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear user info and token from session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    // Navigate back to login page
    navigate('/login');
  };

  // Specify routes where Logout should not appear
  const hideLogoutRoutes = ['/', '/register', '/login'];
  const showLogout = !hideLogoutRoutes.includes(location.pathname);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="p-3"
      style={{ backgroundColor: '#343a40' }}
    >
      <Navbar.Brand href="/" className="fw-bold">
        Task Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">
          {/* Home Page Link */}
          <Nav.Link
            href="/"
            className="text-light fw-bold mx-2"
            style={{ fontSize: '1rem' }}
          >
            Home
          </Nav.Link>
          {/* <Nav.Link
            href="/login"
            className="text-light fw-bold mx-2"
            style={{ fontSize: '1rem' }}
          >
            Login
          </Nav.Link>
          <Nav.Link
            href="/register"
            className="text-light fw-bold mx-2"
            style={{ fontSize: '1rem' }}
          >
            Register
          </Nav.Link> */}

          {/* Logout Button (only when not on specific routes) */}
          {showLogout && (
            <Button
              variant="outline-light"
              className="ms-3"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
