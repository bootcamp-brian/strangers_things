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

export const getPosts = async () => {
  try {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      return data.data.posts;
  } catch {
      console.error('Oops, something went wrong');
  }
}

export const createPost = async ({ token, postTitle, postDescription, postPrice, postDelivery, postLocation }) => {
  try {
      const response = await fetch(`${BASE_URL}/posts`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            post: {
              title: `${postTitle}`,
              description: `${postDescription}`,
              price: `${postPrice}`,
              willDeliver: postDelivery,
              location: `${postLocation}`
            }
          })
      });
  } catch {
      console.error('Oops, something went wrong')
  }
}

export const sendMessage = async ({ token, postMessages, postid }) => {
  try {
      const response = await fetch(`${BASE_URL}/posts/${postid}/messages`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: {
              content: `${postMessages[postid]}`
            }
          })
      })
  } catch {
      console.error('Oops, something went wrong')
  }
}

export const deletePost = async ({ token, postid }) => {
  try {
      const response = await fetch(`${BASE_URL}/posts/${postid}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  } catch {
      console.error('Oops, something went wrong')
  }
}

export const savePost = async (postTitleEdit, postDescriptionEdit, postPriceEdit, postLocationEdit, postWillDeliverEdit, token, postid) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postid}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title: `${postTitleEdit}`,
          description: `${postDescriptionEdit}`,
          price: `${postPriceEdit}`,
          location: `${postLocationEdit}`,
          willDeliver: postWillDeliverEdit
        }
      })
    });
} catch {
    console.error('Oops, something went wrong')
}
}