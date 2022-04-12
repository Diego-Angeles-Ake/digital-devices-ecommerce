import React from 'react';
import { Container, Spinner, Stack, Card, Row, Col } from 'react-bootstrap';
import thousand from '../../utils/thousandSeparator';
import { useGetUserPurchasesQuery } from '../api/apiSlice';

export default function Purchase() {
  const {
    data: purchases,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetUserPurchasesQuery(null, { refetchOnMountOrArgChange: true });
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);
  if (isFetching) console.log('im fetching');
  console.log(purchases);
  return isLoading ? (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{ height: '20vmin', width: '20vmin', fontSize: '10vmin' }}
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Container>
  ) : (
    !isLoading && !isError && isSuccess && (
      <Container>
        <h1>Purchases</h1>
        <Row className='d-flex justify-content-center'>
          <Col xs={12} xxl={10}>
            <Stack gap={3}>
              {purchases.data.purchases.map((purchase) => {
                console.log(typeof purchase.createdAt);
                return (
                  <Card style={{ minWidth: '100%' }}>
                    <Card.Body>
                      <Card.Title>
                        {new Date(purchase.createdAt).toLocaleDateString(
                          undefined,
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Card.Title>
                      <Card.Text>
                        {purchase.cart.products.map((product) => {
                          console.log(product);
                          return (
                            <Row className='mb-2'>
                              <Col
                                xs={3}
                                xl={3}
                                className='d-flex flex-column flex-xxl-row'
                              >
                                <b>{product.title}</b>
                              </Col>
                              <Col
                                xs={3}
                                xl={3}
                                className='d-flex flex-column flex-xxl-row'
                              >
                                <span>
                                  <b>Quantity:</b>{' '}
                                  {product.productsInCart.quantity}
                                </span>
                              </Col>
                              <Col
                                xs={3}
                                xl={3}
                                className='d-flex flex-column flex-xxl-row'
                              >
                                <b>Unit Cost:</b> $
                                {thousand(parseFloat(product.price))}
                              </Col>
                              <Col
                                xs={3}
                                xl={3}
                                className='d-flex flex-column flex-xxl-row'
                              >
                                <b>Subtotal:</b> $
                                {thousand(
                                  parseFloat(product.productsInCart.quantity) *
                                    parseFloat(product.price)
                                )}
                              </Col>
                            </Row>
                          );
                        })}
                        <Row>
                          <hr />
                          <Col
                            xs={3}
                            className='d-flex offset-9 offset-xxl-9 flex-column flex-xxl-row'
                          >
                            <b>Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                            <span>
                              $
                              {thousand(
                                purchase.cart.products.reduce(
                                  (total, product) => {
                                    return (
                                      total +
                                      parseFloat(
                                        product.productsInCart.quantity
                                      ) *
                                        parseFloat(product.price)
                                    );
                                  },
                                  0
                                )
                              )}
                            </span>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Stack>
          </Col>
        </Row>
      </Container>
    )
  );
}
