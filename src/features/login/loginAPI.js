import axios from 'axios';

export function createAccount(userData) {
  return axios.post(
    'https://ecommerce-exercise-backend.herokuapp.com/login/',
    userData
  );
}
