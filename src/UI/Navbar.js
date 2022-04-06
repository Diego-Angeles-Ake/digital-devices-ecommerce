import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Button,
  Modal,
  Toast,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import { BsFillBagCheckFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from '../features/login/Login';
import SignUp from '../features/signup/SignUp';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectError } from '../features/login/loginSlice';

import { reset } from '../features/login/loginSlice';

import { FcApproval } from 'react-icons/fc';
import { FcHighPriority } from 'react-icons/fc';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const userLogged = localStorage.getItem('user');
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const [cartShow, setCartShow] = useState(false);
  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => {
    if (userLogged) {
      setCartShow(true);
    } else {
      handleLoginShow();
    }
  };

  const [showLogSign, setShowLogSign] = useState(true);
  const handleLogSignToggle = () => {
    setShowLogSign((prevShowLogSign) => {
      return !prevShowLogSign;
    });
  };
  const [showToast, setShowToast] = useState(false);
  const [render, setRender] = useState(false);

  const handleSignOut = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    setRender(!render);
  };

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Welcome back {userLogged}</Popover.Header>
      <Popover.Body className='d-flex justify-content-center'>
        <Button variant='danger' onClick={handleSignOut}>
          Sign Out
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate('/');
          }}
        >
          {/* <Link to={'/'} style={{ textDecoration: 'none' }}> */}
          <BsFillBagCheckFill size='2.5em' color='black' />
          {/* </Link> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav' className='justify-content-end'>
          <Nav>
            {!userLogged ? (
              <Nav.Link variant='primary' onClick={handleLoginShow}>
                Login
              </Nav.Link>
            ) : (
              <OverlayTrigger
                trigger='click'
                placement='bottom'
                overlay={popover}
              >
                <Nav.Link variant='success'>{userLogged}</Nav.Link>
              </OverlayTrigger>
            )}
            <Modal
              show={showLogin}
              onHide={handleLoginClose}
              backdrop='static'
              keyboard={false}
            >
              <Toast
                onClose={(e) => {
                  dispatch(reset());
                  setShowToast(false);
                }}
                show={showToast}
                animation={false}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  {!error ? <FcApproval /> : <FcHighPriority />}
                  <strong className='me-auto'>Authorization</strong>
                  {!error && <small>You can log in now!</small>}
                </Toast.Header>
                <Toast.Body>
                  {error || 'Your account has been successfully created'}
                </Toast.Body>
              </Toast>
              {showLogSign ? (
                <Login
                  onLoginClose={handleLoginClose}
                  onSetShowToast={setShowToast}
                />
              ) : (
                <SignUp
                  onLogSignToggle={handleLogSignToggle}
                  onSetShowToast={setShowToast}
                />
              )}
              <Modal.Footer className='d-flex justify-content-between'>
                <h5>
                  {showLogSign
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </h5>
                <div>
                  <Button
                    className='mx-3'
                    variant='secondary'
                    onClick={handleLoginClose}
                  >
                    Close
                  </Button>
                  <Button variant='primary' onClick={handleLogSignToggle}>
                    {showLogSign ? 'Sign Up' : 'Log In'}
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
            <Nav.Link
              onClick={() => {
                if (userLogged) {
                  navigate('/purchase');
                } else {
                  handleLoginShow();
                }
              }}
            >
              {/* <Link
                to={'/purchase'}
                style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.55)' }}
              > */}
              Purchase
              {/* </Link> */}
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
