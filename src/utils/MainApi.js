const { REACT_APP_BASE_URL = 'http://localhost:3000' } = process.env;

class Api {
  constructor({ baseUrl, headers, options }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.options = options;
  }

  login = (email, password) => {
    return fetch(`${REACT_APP_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    }).then((response) => {
      return response.json();
    });
  };

  register = (name, email, password) => {
    return fetch(`${REACT_APP_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
    }).then((response) => {
      return response.json();
    });
  };
}

export default Api = new Api({
  baseUrl: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  options: { credentials: 'include' },
});
