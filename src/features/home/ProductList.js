import React, { useEffect } from 'react';
import { useGetAllProductsQuery } from '../api/apiSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectDisplayedProducts } from './homeSlice';
import { setProducts } from './homeSlice';
import { Container, Spinner, Card, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { openLogIn } from '../login/loginSlice';

export default function ProductList() {
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

  const handleAddToCart = () => {
    if (userLogged) {
      // Todo
    } else {
      dispatch(openLogIn());
    }
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
            <div key={product.id} className='d-flex flex-row flex-wrap'>
              <Card style={{ width: '17rem' }} className='me-4 my-2'>
                <div className='img-container'>
                  <Card.Img
                    variant='top'
                    src={`${product.productImgs[0]}`}
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '30vmin',
                    }}
                  />
                  <Card.ImgOverlay
                    src={`${product.productImgs[1]}`}
                    as='img'
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '30vmin',
                    }}
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
                        $ {product.price}
                      </Card.Text>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                      <Button variant='none' onClick={handleAddToCart}>
                        <AiOutlineShoppingCart color='black' size='3.5vmin' />
                      </Button>
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
