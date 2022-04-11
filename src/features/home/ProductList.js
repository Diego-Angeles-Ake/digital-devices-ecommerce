import React, { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../api/apiSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDisplayedProducts } from './homeSlice';
import { setProducts } from './homeSlice';
import { Container, Spinner, Card, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { openLogIn } from '../login/loginSlice';
import thousand from '../../utils/thousandSeparator';
import { useAddProductToCartMutation } from '../api/apiSlice';
import { useUpdateProductInCartMutation } from '../api/apiSlice';
import { useGetUserCartQuery } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const navigate = useNavigate();
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const [addToCart, { isLoading: addingToCart }] =
    useAddProductToCartMutation();
  const {
    data: cart,
    isLoading: gettingCart,
    isError: cartError,
  } = useGetUserCartQuery();
  const [updateCart, { isLoading: updatingCart }] =
    useUpdateProductInCartMutation();
  const products = useSelector(selectDisplayedProducts);
  const userLogged = localStorage.getItem('user');
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess /* isFetching, isError, error  */ } =
    useGetAllProductsQuery();
  //   console.log(allProductsData);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setProducts(data.data.products));
    }
  }, [isSuccess, data?.data?.products, dispatch]);

  const handleAddToCart = async (id, quantity = 1) => {
    if (userLogged) {
      try {
        setCurrentUpdate(id);
        console.log({ id, quantity });
        await addToCart({ id, quantity }).unwrap();
        setCurrentUpdate(null);
      } catch (err) {
        console.error('Failed to add to cart: ', err);
        if (err.data.message === 'You already added this product to the cart') {
          const updatedProduct = cart.data.cart.products.filter(
            (product) => product.id === id
          );
          const current_qty = updatedProduct[0].productsInCart.quantity;
          try {
            const updata = { id, newQuantity: current_qty + 1 };
            // console.log(updata);
            setCurrentUpdate(id);
            await updateCart(updata).unwrap();
            setCurrentUpdate(null);
          } catch (err) {
            // console.error('Failed to add to cart: ', err);
          }
        }
      }
    } else {
      dispatch(openLogIn());
    }
  };

  const handleGotoProduct = (id) => {
    navigate(`shop/${id}`);
  };

  return (
    <Container className='d-flex flex-row flex-wrap'>
      {isLoading ? (
        <Spinner animation='grow' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : products.length === 0 ? (
        <h4>No products Found</h4>
      ) : (
        products.map((product) => {
          return (
            <div
              key={product.id}
              className='d-flex flex-row flex-wrap'
              onClick={() => {
                handleGotoProduct(product.id);
              }}
            >
              <Card style={{ width: '17rem' }} className='me-4 my-2'>
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
                          <AiOutlineShoppingCart color='black' size='3.5vmin' />
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          );
        })
      )}
    </Container>
  );
}
