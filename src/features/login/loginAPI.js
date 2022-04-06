import axios from 'axios';

export function createAccount(userData) {
  return axios.post(
    'https://ecommerce-api-react.herokuapp.com/api/v1/users',
    userData
  );
}

export function logAccount(userData) {
  return axios.post(
    'https://ecommerce-api-react.herokuapp.com/api/v1/users/login',
    userData
  );
}
