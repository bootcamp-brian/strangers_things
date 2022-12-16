const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-ftb-pt-web-pt';

export const registerUser = async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            password: `${password}`
          }
        })
    });
    const data = await response.json();
    return data;
}

export const loginUser = async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            password: `${password}`
          }
        })
    });
    const data = await response.json();
    return data;
}

export const getMessages = async (token) => {
  try {
      const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        return data;
  } catch {
      console.error('Oops, something went wrong')
  }
}