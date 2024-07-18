import axios from 'axios';

const api = axios.create({
  /*  baseURL: 'http:/192.168.0.10:3333', */
  baseURL: 'https://api.vivavoz.redesucodelaranja.com.br',
});

export default api;
