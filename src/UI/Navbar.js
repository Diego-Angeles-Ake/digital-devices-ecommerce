import React, { useState, useEffect } from 'react';
// Bootstrap
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
// Icons
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import { FcApproval } from 'react-icons/fc';
import { FcHighPriority } from 'react-icons/fc';
import { MdRemoveShoppingCart } from 'react-icons/md';
// Router
import { useNavigate } from 'react-router-dom';
import Login from '../features/login/Login';
import SignUp from '../features/signup/SignUp';
// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  closeLogIn,
  selectError,
  selectShowLogIn,
} from '../features/login/loginSlice';
import { useGetUserCartQuery } from '../features/api/apiSlice';
import { useRemoveProductFromCartMutation } from '../features/api/apiSlice';
import { usePurchaseCartMutation } from '../features/api/apiSlice';
import { reset } from '../features/login/loginSlice';
// Utils
import thousand from '../utils/thousandSeparator';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeProduct] = useRemoveProductFromCartMutation();
  const [purchaseCart] = usePurchaseCartMutation();
  const { data, isLoading, isError, refetch } = useGetUserCartQuery();
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
    refetch();
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

  const handleRemoveFromCart = async (id) => {
    await removeProduct(id).unwrap();
  };
  useEffect(() => {
    if (openLogin) {
      handleLoginShow();
    }
  }, [openLogin]);
  const handleGotoPurchase = async () => {
    await purchaseCart().unwrap();
    navigate('/purchase');
    refetch();
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
  let cartProducts = [];
  if (data?.data?.cart?.products) {
    cartProducts = Array.from(data?.data?.cart?.products);
    cartProducts.sort((a, b) => {
      return a.id - b.id;
    });
  }

  return (
    <>
      <Navbar bg='primary' expand='lg' sticky='top'>
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/');
            }}
          >
            <BsFillBagCheckFill size='2.5em' color='white' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-nav' />
          <Navbar.Collapse id='navbar-nav' className='justify-content-end'>
            <Nav>
              {!userLogged ? (
                <Nav.Link onClick={handleLoginShow}>Login</Nav.Link>
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
                    <Button variant='secondary' onClick={handleLoginClose}>
                      Close
                    </Button>
                    <Button
                      variant='primary'
                      className='mx-3'
                      onClick={handleLogSignToggle}
                    >
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
                <MdOutlineShoppingCart size='1.5em' />
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
                              <Button
                                variant='danger'
                                onClick={() => {
                                  handleRemoveFromCart(product.id);
                                }}
                              >
                                <MdRemoveShoppingCart />
                              </Button>
                            </Card.Footer>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <h4>No products</h4>
                    )}
                  </Stack>
                  <Container
                    style={{
                      position: 'absolute',
                      top: '100vh',
                      transform: 'translateY(-100%)',
                      width: '90%',
                      background: 'white',
                    }}
                  >
                    <Container className='d-flex flex-row align-items-baseline justify-content-between'>
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
                    </Container>
                    <Container>
                      <Button
                        onClick={handleGotoPurchase}
                        style={{ width: '100%' }}
                      >
                        Purchase <BsCartCheck />
                      </Button>
                    </Container>
                  </Container>
                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
