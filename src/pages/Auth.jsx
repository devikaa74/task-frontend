import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI, loginAPI } from '../services/allAPI';

const Auth = ({ insideRegister = false }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userDetails.username && userDetails.email && userDetails.password) {
      try {
        // Log userDetails before API call for debugging
        console.log('User details for registration:', userDetails);
        
        const result = await registerAPI(userDetails);
        
        // Log the API response for debugging
        console.log('API Response:', result);

        if (result.status === 200) {
          alert('Registration Successful');
          navigate('/login');
          setUserDetails({ username: '', email: '', password: '' });
        } else if (result.response && result.response.status === 401) {
          alert(result.response.data);
          setUserDetails({ username: '', email: '', password: '' });
        } else {
          alert('Unexpected response. Please try again.');
        }
      } catch (err) {
        // Log error to console for debugging
        console.error('Error during registration:', err);
        alert('Registration failed. Please try again.');
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (email && password) {
      try {
        const response = await loginAPI({ email, password });
        const { token, user } = response.data;
        if (token && user && user._id) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', user._id);
          navigate(`/${user._id}/tasks`);
        } else {
          alert('Invalid credentials or missing user data in the response.');
        }
      } catch (error) {
        console.error('Login Error:', error);
        alert('An error occurred while logging in. Please try again.');
      }
    } else {
      alert('Please fill in both email and password');
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h2 className="text-center mb-4">{insideRegister ? 'Register' : 'Login'}</h2>
            <Form>
              {insideRegister && (
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={userDetails.username}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
              </Form.Group>
              <Button
                onClick={insideRegister ? handleRegister : handleLogin}
                variant="primary"
                type="submit"
                className="w-100"
              >
                {insideRegister ? 'Register' : 'Login'}
              </Button>
              <p className="mt-3 text-center">
                {insideRegister ? (
                  <>
                    Already a user? <Link to="/login">Login</Link>
                  </>
                ) : (
                  <>
                    New user? <Link to="/register">Register</Link>
                  </>
                )}
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
