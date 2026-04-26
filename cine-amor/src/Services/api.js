const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const baseURL = env.VITE_API_URL || 'http://localhost:8001/api';

const request = async (path, options = {}) => {
  const token = localStorage.getItem('cineamor_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(typeof data === 'object' ? data.message : 'Request failed');
    error.response = { data };
    throw error;
  }

  return { data };
};

const api = {
  get(path) {
    return request(path);
  },
  post(path, body) {
    return request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  put(path, body) {
    return request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },
  delete(path) {
    return request(path, {
      method: 'DELETE',
    });
  },
};

export default api;
