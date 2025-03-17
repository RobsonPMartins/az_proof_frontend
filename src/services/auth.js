import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/proof/session', { email, password });
    const token = response.data.token;

    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { success: true, token };
  } catch (error) {
    return { success: false, message: 'Credenciais inválidas' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};
