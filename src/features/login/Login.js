import React, { useState, useEffect } from 'react';

import { Form, Button, Modal, Spinner } from 'react-bootstrap';

import { reset, selectError } from './loginSlice';

import { useDispatch, useSelector } from 'react-redux';
import { logUser, selectLogStatus } from './loginSlice';

// import styles from './Login.module.css';

export default function Login({ onLoginClose, onSetShowToast }) {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const status = useSelector(selectLogStatus);
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    dispatch(logUser(data));
  };

  useEffect(() => {
    if (error) {
      onSetShowToast(true);
    } else if (status === 'success') {
      onLoginClose();
      dispatch(reset());
    }
  }, [error, onSetShowToast, status, dispatch, onLoginClose]);
  return (
    <>
      <Modal.Header>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='admin@admin.com'
              name='email'
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='root'
              name='password'
              value={password}
              onChange={handlePassChange}
              required
            />
          </Form.Group>
          {status === 'loading' ? (
            <Button variant='primary' disabled>
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Loading...
            </Button>
          ) : (
            <Button variant='primary ' type='submit'>
              Login
            </Button>
          )}
        </Form>
      </Modal.Body>
    </>
  );
}
