import React from 'react';
// Components
import Filters from './Filters';
import SearchBar from './SearchBar';
import ProductList from './ProductList';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
      {/* <div className='d-flex align-items-center'> */}
      <Row className='mt-4'>
        <Col
          xs={12}
          xxl={3}
          className='d-flex flex-column align-items-center'
          // style={{ width: 'initial', minWidth: '15.0vw' }}
        >
          <Filters />
        </Col>
        <Col xs={12} xxl={9} /*  style={{ minWidth: '75vw' }} */>
          <Row
            /* style={{ background: '#89BD9E' }} */
            className='d-flex justify-content-center'
          >
            <SearchBar />
          </Row>
          <Row /* style={{ background: '#DB4C40' }} */>
            <ProductList />
          </Row>
        </Col>
      </Row>
      {/* </div> */}
    </Container>
  );
}
