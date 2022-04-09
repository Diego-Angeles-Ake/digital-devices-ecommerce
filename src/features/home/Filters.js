import React, { useState } from 'react';
import { Accordion, Spinner, Button, Form } from 'react-bootstrap';
import { useGetCategoriesQuery } from '../api/apiSlice';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { filterByCategory } from './homeSlice';
import { removeFilters } from './homeSlice';
import { SiCashapp } from 'react-icons/si';
import { filterByPrice } from './homeSlice';

export default function Filters() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCategoriesQuery();
  // console.log(data);
  const handleFilter = (category) => {
    dispatch(filterByCategory(category));
  };
  const handleRemoveFilters = () => {
    dispatch(removeFilters());
  };
  const handleMinChange = (e) => {
    setMin(e.target.value);
  };
  const handleMaxChange = (e) => {
    setMax(e.target.value);
  };
  const handlePriceFilter = (e) => {
    e.preventDefault();
    const priceRange = {
      min,
      max,
    };
    dispatch(filterByPrice(priceRange));
  };
  return (
    <>
      <Accordion
        defaultActiveKey='1'
        style={{ width: '100%', minWidth: '100%' }}
        className='mb-4'
      >
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey='0' flush>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Price</Accordion.Header>
                <Accordion.Body>
                  <Form onSubmit={handlePriceFilter}>
                    <Form.Group
                      className='mb-3 d-flex flex-row'
                      controlId='formPrice'
                    >
                      <Form.Control
                        className='me-1'
                        type='number'
                        placeholder='$Min.'
                        value={min}
                        onChange={handleMinChange}
                      />
                      <Form.Control
                        className='ms-1'
                        type='number'
                        placeholder='$Max.'
                        value={max}
                        onChange={handleMaxChange}
                      />
                    </Form.Group>
                    <Button
                      variant='primary'
                      type='submit'
                      style={{ fontSize: '2vmin', fontWeight: '700' }}
                    >
                      Go
                      <SiCashapp className='ms-3' />
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey='0' flush>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Categories</Accordion.Header>
                <Accordion.Body className='d-flex flex-column align-items-start'>
                  {isLoading ? (
                    <Spinner animation='border' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                  ) : (
                    data.data.categories.map((category) => {
                      return (
                        <Button
                          key={category.id}
                          className='my-2'
                          variant='none'
                          onClick={() => {
                            handleFilter(category.name);
                          }}
                        >
                          {category.name}
                        </Button>
                      );
                    })
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {!isLoading && (
              <Button variant='none' onClick={handleRemoveFilters}>
                Remove Filters <BsTrash />
              </Button>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
