import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // Substitua pela URL real da sua API
});

export default api;
