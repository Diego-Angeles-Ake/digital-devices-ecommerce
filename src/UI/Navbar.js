import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Button,
  Modal,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../features/login/Login';

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const [cartShow, setCartShow] = useState(false);
  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          {/* <Navbar.Brand> */}
          React-Bootstrap
          {/* </Navbar.Brand> */}
        </Link>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link variant='primary' onClick={handleLoginShow}>
              Login
            </Nav.Link>

            <Modal
              show={showLogin}
              onHide={handleLoginClose}
              backdrop='static'
              keyboard={false}
            >
              <Login />
              <Modal.Footer className='d-flex justify-content-between'>
                <h5>Don't have an account?</h5>
                <div>
                  <Button
                    className='mx-3'
                    variant='secondary'
                    onClick={handleLoginClose}
                  >
                    Close
                  </Button>
                  <Button variant='primary'>Sign Up</Button>
                </div>
              </Modal.Footer>
            </Modal>

            <Nav.Link>
              <Link
                to={'/purchase'}
                style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.55)' }}
              >
                Purchase
              </Link>
            </Nav.Link>

            <Nav.Link variant='primary' onClick={handleCartShow}>
              Cart
            </Nav.Link>
            <Offcanvas
              show={cartShow}
              onHide={handleCartClose}
              placement='end'
              backdrop={false}
              scroll={true}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements
                you have chosen. Like, text, images, lists, etc.
              </Offcanvas.Body>
            </Offcanvas>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
