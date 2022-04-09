import React, { useState, useEffect } from 'react';
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
  Stack,
  Card,
} from 'react-bootstrap';
import { BsFillBagCheckFill } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import Login from '../features/login/Login';
import SignUp from '../features/signup/SignUp';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  closeLogIn,
  selectError,
  selectShowLogIn,
} from '../features/login/loginSlice';

import { reset } from '../features/login/loginSlice';

import { FcApproval } from 'react-icons/fc';
import { FcHighPriority } from 'react-icons/fc';
import thousand from '../utils/thousandSeparator';
// Cart
import { useGetUserCartQuery } from '../features/api/apiSlice';
import { MdRemoveShoppingCart } from 'react-icons/md';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError, isFetching } = useGetUserCartQuery();
  // console.log(data, isFetching);
  const error = useSelector(selectError);
  const openLogin = useSelector(selectShowLogIn);
  const userLogged = localStorage.getItem('user');
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClose = () => {
    dispatch(closeLogIn());
    setShowLogin(false);
  };
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
    navigate('/');
    setRender(!render);
  };

  useEffect(() => {
    if (openLogin) {
      handleLoginShow();
    }
  }, [openLogin]);

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
  let cartProducts = [];
  if (data?.data?.cart?.products) {
    cartProducts = Array.from(data?.data?.cart?.products);
    cartProducts.sort((a, b) => {
      return a.id - b.id;
    });
  }

  return (
    <Navbar bg='light' expand='lg' sticky='top'>
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
              Purchase
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
              <hr />
              <Offcanvas.Body className='d-flex flex-column'>
                <Stack gap={3}>
                  {userLogged && !isLoading && !isError ? (
                    cartProducts.map((product) => (
                      <Card
                        style={{ width: '18rem' }}
                        key={product.id}
                        className='align-self-center'
                      >
                        <Card.Body>
                          <Card.Text>{product.brand}</Card.Text>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text>
                            Qty: {product.productsInCart.quantity} Price: $
                            {product.price}
                          </Card.Text>
                          <Card.Footer className='d-flex flex-row justify-content-between align-items-baseline'>
                            <Card.Subtitle>
                              Total: $
                              {parseFloat(product.productsInCart.quantity) *
                                parseFloat(product.price)}
                            </Card.Subtitle>
                            <Button variant='danger'>
                              <MdRemoveShoppingCart />
                            </Button>
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <h1>Log In to add products to your cart</h1>
                  )}
                </Stack>
                <hr />

                <div className='d-flex flex-row align-items-baseline justify-content-between'>
                  <h4>Total:</h4>
                  <h4>
                    $
                    {userLogged &&
                      !isLoading &&
                      !isError &&
                      thousand(
                        data.data.cart.products.reduce(
                          (total, product) =>
                            total +
                            parseFloat(product.productsInCart.quantity) *
                              parseFloat(product.price),
                          0
                        )
                      )}
                  </h4>
                </div>
                <Button>Purchase</Button>
              </Offcanvas.Body>
            </Offcanvas>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
