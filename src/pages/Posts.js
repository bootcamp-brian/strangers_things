import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const cohort = '2209-ftb-pt-web-pt';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useOutletContext();
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postDelivery, setPostDelivery] = useState(false);
    const [postMessages, setPostMessages] = useState({});
    const { username } = jwt_decode(token);

    const getPosts = async () => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts`);
            const data = await response.json();
            setPosts(data.data.posts);
        } catch {
            console.error('Oops, something went wrong');
        }
    }

    const createPost = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts`, {
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
                    willDeliver: postDelivery
                  }
                })
            });
            setPostTitle('');
            setPostDescription('');
            setPostPrice('');
            setPostDelivery(false);
            getPosts();
        } catch {
            console.error('Oops, something went wrong')
        }
    }

    const sendMessage = async (event, postid) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts/${postid}/messages`, {
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
            const data = await response.json();
            console.log(data)
            postMessages[postid] = '';
            getPosts();
        } catch {
            console.error('Oops, somethign went wrong')
        }
    }

    const deletePost = async (postid) => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts/${postid}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
              getPosts();
        } catch {
            console.error('Oops, something went wrong')
        }
    }
    
    useEffect(() => {
            getPosts();
    }, [])

    return <div className="page">
        {
            token && <>
            <h1>Welcome {username}</h1>
            <h1>Create New Post</h1>
            <form className="createPost" onSubmit={createPost}>
                <section>
                    <label htmlFor="postTitle">Title:</label>
                    <br/>
                    <input
                        id="postTitle"
                        type="text"
                        placeholder="enter post title..."
                        minLength="1"
                        required
                        value={postTitle}
                        onChange={event => setPostTitle(event.target.value)}/>
                </section>
                <section>
                    <label htmlFor="postPrice">Price:</label>
                    <br/>
                    <input
                        id="postPrice"
                        type="text"
                        placeholder="enter post price..."
                        minLength="1"
                        required
                        value={postPrice}
                        onChange={event => setPostPrice(event.target.value)}/>
                </section>
                <section>
                    <label htmlFor="postDescription">Description:</label>
                    <br/>
                    <textarea
                        id="postDescription"
                        rows="5"
                        cols="20"
                        placeholder="enter post description..."
                        minLength="1"
                        required
                        value={postDescription}
                        onChange={event => setPostDescription(event.target.value)}></textarea>
                </section>
                <section>
                    <label htmlFor="postDelivery">Are you willing to deliver?</label>
                    <br/>
                    <input
                        id="postDelivery"
                        type="checkbox"
                        checked={postDelivery}
                        onChange={() => postDelivery ? setPostDelivery(false) : setPostDelivery(true)}/>
                </section>
                <button type="submit">Submit Post</button>
            </form>
            <h1>Available Posts</h1>
            </>
        }
        <section className="posts">
            {
                token ? posts.map(post =>
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <h4>Description:</h4>
                        <p>{post.description}</p>
                        <h4>Price:</h4>
                        <p>{post.price}</p>
                        <h4>Delivery available?</h4>
                        <p>{post.willDeliver ? 'Yes' : 'No'}</p>
                        {
                            post.author.username === username && <button onClick={() => deletePost(post._id)}>Delete</button>
                        }
                        {
                            post.author.username !== username &&
                            <form className="sendMessage" onSubmit={event => {
                                sendMessage(event, post._id);
                                }}>
                                <h4>Send A Message:</h4>
                                <br/>
                                <textarea
                                    className="postMessage"
                                    rows="5"
                                    cols="20"
                                    placeholder="enter your message here..."
                                    minLength="1"
                                    required
                                    value={postMessages[post._id]}
                                    onChange={event => {
                                        postMessages[post._id] = event.target.value;
                                        setPostMessages(postMessages);
                                    }}></textarea>
                                <br/>
                                <button type="submit">Send</button>
                            </form>
                        }
                    </div>
                ) : <h1>You are not logged in</h1>
            }
        </section>
    </div>
}

export default Posts