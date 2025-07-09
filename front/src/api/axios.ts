import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apishop-0b1k.onrender.com/api',
});

export default api;
