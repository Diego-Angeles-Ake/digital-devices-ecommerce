import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

// import styles from './SignUp.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className='mb-3' controlId='formName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' placeholder='Name' />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3' controlId='formLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' placeholder='Last Name' />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className='mb-3' controlId='formEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          onChange={handleEmailChange}
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          onChange={handlePassChange}
        />
      </Form.Group>

      <Button variant='primary ' type='submit'>
        Submit
      </Button>
    </Form>
  );
}
