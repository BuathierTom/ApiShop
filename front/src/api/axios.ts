import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.apishop.buathier-tom.fr/api',
});

export default api;
