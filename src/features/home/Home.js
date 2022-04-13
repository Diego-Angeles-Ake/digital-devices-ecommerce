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
      <Row className='mt-4'>
        <Col xs={12} xxl={3} className='d-flex flex-column align-items-center'>
          <Filters />
        </Col>
        <Col xs={12} xxl={9}>
          <Row className='d-flex justify-content-center'>
            <SearchBar />
          </Row>
          <Row>
            <ProductList />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
