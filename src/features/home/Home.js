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
      <div className='d-flex align-items-center'>
        <Row className='justify-content-center'>
          <Col
            style={
              {
                /* background: '#F0C987' */
              }
            }
            className='d-flex flex-column align-items-center'
          >
            <Filters />
          </Col>
          <Col xs={10} style={{ minWidth: '75vw' }}>
            <Row
            /* style={{ background: '#89BD9E' }} */
            >
              <SearchBar />
            </Row>
            <Row /* style={{ background: '#DB4C40' }} */>
              <ProductList />
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
