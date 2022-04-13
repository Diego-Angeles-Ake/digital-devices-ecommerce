import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { useGetAllProductsQuery } from '../api/apiSlice';
import { useDispatch } from 'react-redux';
import { filterByName } from './homeSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllProductsQuery();
  const [productName, setProductName] = useState('');
  const handleProdNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterByName(productName));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className='mb-3 d-flex flex-row '
        controlId='formProduct'
        style={{ height: '54px' }}
      >
        <Form.Control
          type='product'
          placeholder='Enter product'
          list='products'
          value={productName}
          onChange={handleProdNameChange}
        />
        <datalist id='products'>
          {!isLoading &&
            data.data.products.map((product) => {
              return <option value={`${product.title}`} key={product.id} />;
            })}
        </datalist>
        <Button variant='none' type='submit'>
          <BiSearch size='40px' />
        </Button>
      </Form.Group>
    </Form>
  );
}
