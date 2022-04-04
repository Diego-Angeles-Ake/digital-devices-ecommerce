import React, { useState } from 'react';

import { Form, Button, Modal } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { addUserAsync } from './loginSlice';

// import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { email: email, password: password };
    dispatch(addUserAsync(data)).then((res) =>
      localStorage.setItem('token', res.data.access)
    );
  };

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
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='root'
              name='password'
              onChange={handlePassChange}
            />
          </Form.Group>
          <Button variant='primary ' type='submit'>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
