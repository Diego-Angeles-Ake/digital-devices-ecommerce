import React, { useState, useEffect } from 'react';

import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

import { createUser, selectSignStatus, selectError } from '../login/loginSlice';

import { useDispatch, useSelector } from 'react-redux';
import {
  emailValidation,
  nameValidation,
  phoneValidation,
} from '../../utils/emailRegex';

// import styles from './SignUp.module.css';

export default function SignUp({ onLogSignToggle, onSetShowToast }) {
  const status = useSelector(selectSignStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState('');
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const [lastname, setLastName] = useState('');
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      phone: phone,
    };
    dispatch(createUser(data));
  };

  useEffect(() => {
    if (status === 'success') {
      onLogSignToggle();
      onSetShowToast(true);
    } else if (error) {
      onSetShowToast(true);
    }
  }, [status, error, onSetShowToast, onLogSignToggle]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Name'
                  value={firstname}
                  onChange={handleFirstNameChange}
                  pattern={nameValidation}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Last Name'
                  value={lastname}
                  onChange={handleLastNameChange}
                  pattern={nameValidation}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={handleEmailChange}
              pattern={emailValidation}
              required
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
              value={password}
              onChange={handlePassChange}
              // pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
              required
            />
            <Form.Text className='text-muted'>
              Minimum eight characters, at least one letter and one number
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formTelephone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='tel'
              placeholder='Phone'
              pattern={phoneValidation}
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <Form.Text className='text-muted'>10 Digit Phone Number</Form.Text>
          </Form.Group>
          <Button variant='primary ' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
