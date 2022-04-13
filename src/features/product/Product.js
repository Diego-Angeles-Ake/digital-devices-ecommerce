import React, { useState } from 'react';
import { Carousel, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import {
  useAddProductToCartMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetUserCartQuery,
  useUpdateProductInCartMutation,
} from '../api/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import thousand from '../../utils/thousandSeparator';
import { Button, Card } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { openLogIn } from '../login/loginSlice';

export default function Product() {
  const dispatch = useDispatch();
  const userLogged = localStorage.getItem('user');
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleChangeQty = (e) => {
    setQuantity(e.target.value);
  };

  const navigate = useNavigate();
  const { data: cart, isLoading: gettingCart } = useGetUserCartQuery();
  const [addToCart, { isLoading: addingToCart }] =
    useAddProductToCartMutation();
  const [updateCart, { isLoading: updatingCart }] =
    useUpdateProductInCartMutation();
  const { id: productId } = useParams();
  let allProducts = [];
  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetProductByIdQuery(productId);

  const {
    data: allProds,
    isLoading: loadingProds,
    isError: errorProds,
    isSuccess: prodsLoaded,
  } = useGetAllProductsQuery();

  if (prodsLoaded && !errorProds && !isLoading) {
    allProducts = [...allProds.data.products];
    allProducts = allProducts.filter((prod) => {
      return (
        product.data.product.category === prod.category.name &&
        product.data.product.id !== prod.id
      );
    });
  }
  const handleGotoProduct = (id) => {
    navigate(`/shop/${id}`);
  };

  const handleAddToCart = async (id, quantity = 1) => {
    if (userLogged) {
      try {
        setCurrentUpdate(id);
        const tempQty = parseInt(quantity);
        await addToCart({ id, tempQty }).unwrap();
        setCurrentUpdate(null);
      } catch (err) {
        console.error('Failed to add to cart: ', err);
        if (err.data.message === 'You already added this product to the cart') {
          const updatedProduct = cart.data.cart.products.filter(
            (product) => product.id === id
          );
          const current_qty = updatedProduct[0].productsInCart.quantity;
          try {
            const updata = {
              id,
              newQuantity: current_qty + parseInt(quantity),
            };
            setCurrentUpdate(id);
            await updateCart(updata).unwrap();
            setCurrentUpdate(null);
          } catch (err) {
            console.error('Failed to add to cart: ', err);
          }
        }
      }
    } else {
      dispatch(openLogIn());
    }
  };

  return isFetching || isLoading || loadingProds ? (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{ width: '30vmin', height: '30vmin', fontSize: '8vmin' }}
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Container>
  ) : (
    <Container className='mt-4'>
      {!isLoading && !isError && isSuccess && (
        <Row className='justify-content-center'>
          <Col xs={12} xxl={6} className='d-flex justify-content-center'>
            <Carousel variant='dark'>
              {product.data.product.productImgs.map((image, i) => (
                <Carousel.Item key={i}>
                  <div
                    style={{
                      minWidth: '56vmin',
                      minHeight: '28vmin',
                    }}
                  >
                    <img
                      style={{
                        display: 'block',
                        objectFit: 'contain',
                        width: '56vmin',
                        height: '28vmin',
                      }}
                      src={image}
                      alt='slide'
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={12} xxl={6} className='d-flex flex-column'>
            <h2>{product.data.product.title}</h2>
            <p className='mt-2' style={{ textAlign: 'justify' }}>
              {product.data.product.description}
            </p>
            <Row>
              <Col>
                <span>Price</span>
                <h5>$ {thousand(product.data.product.price)}</h5>
              </Col>
              <Col>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddToCart(product.data.product.id, quantity);
                  }}
                  id='qtyForm'
                >
                  <Form.Group className='mb-3 ' controlId='formQuantity'>
                    <Row className='d-flex align-items-baseline'>
                      <Col style={{ textAlign: 'end' }}>
                        <Form.Label>Quantity:</Form.Label>
                      </Col>
                      <Col>
                        <Form.Control
                          type='number'
                          placeholder='Qty'
                          min='1'
                          value={quantity}
                          onChange={handleChangeQty}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <Button
              variant='primary'
              type='submit'
              style={{ minWidth: '100%' }}
              form='qtyForm'
            >
              Add to Cart <AiOutlineShoppingCart />
            </Button>
          </Col>
        </Row>
      )}

      <Row className='justify-content-center mt-5'>
        <h3>Customers who bought this item also bought</h3>
        <Container className='d-flex flex-wrap'>
          {allProducts.map((product) => {
            return (
              <Col
                xs={12}
                xxl={4}
                key={product.id}
                className='d-flex flex-column justify-content-start align-items-baseline align-items-center flex-xxl-row'
                onClick={() => {
                  handleGotoProduct(product.id);
                }}
              >
                <Card
                  style={{ width: '100%', height: '95%' }}
                  className='me-4 my-2'
                >
                  <div className='img-container'>
                    <Card.Img
                      variant='top'
                      src={`${product.productImgs[0]}`}
                      style={{
                        objectFit: 'contain',
                        width: '95%',
                        height: '28vmin',
                      }}
                      className='mt-2 mx-2'
                    />
                    <Card.ImgOverlay
                      src={`${product.productImgs[1]}`}
                      as='img'
                      style={{
                        objectFit: 'contain',
                        width: '95%',
                        height: '28vmin',
                      }}
                      className='mt-2 mx-2'
                    />
                  </div>
                  <Card.Body className='d-flex flex-column justify-content-evenly'>
                    <hr />
                    <Card.Title>{product.title}</Card.Title>
                    <Row className='align-items-center justify-content-between'>
                      <Col>
                        <Card.Text
                          style={{ fontSize: '1.25rem', fontWeight: '700' }}
                        >
                          $ {thousand(product.price)}
                        </Card.Text>
                      </Col>
                      <Col className='d-flex justify-content-end'>
                        {(gettingCart || addingToCart || updatingCart) &&
                        currentUpdate === product.id ? (
                          <Button variant='none' disabled>
                            <Spinner
                              as='span'
                              animation='border'
                              size='md'
                              role='status'
                              aria-hidden='true'
                            />
                            <span className='visually-hidden'>Loading...</span>
                          </Button>
                        ) : (
                          <Button
                            variant='none'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product.id);
                            }}
                          >
                            <AiOutlineShoppingCart
                              color='black'
                              size='3.5vmin'
                            />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Container>
      </Row>
    </Container>
  );
}
