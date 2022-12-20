import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getPosts, createPost, deletePost, sendMessage } from '../utils/API';

const cohort = '2209-ftb-pt-web-pt';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useOutletContext();
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postDelivery, setPostDelivery] = useState(false);
    const [postMessages, setPostMessages] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const { username } = token ? jwt_decode(token) : '';
    const postMessagesHolder = {};

    function postMatches(post, text) {
        if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text)) {
            return true;
        } else {
            return false;
        }
    }
      
    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    // const getPosts = async () => {
    //     try {
    //         const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts`);
    //         const data = await response.json();
    //         return data.data.posts;
    //     } catch {
    //         console.error('Oops, something went wrong');
    //     }
    // }

    // const createPost = async ({token, postTitle, postDescription, postPrice, postDelivery}) => {
    //     try {
    //         const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts`, {
    //             method: "POST",
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({
    //               post: {
    //                 title: `${postTitle}`,
    //                 description: `${postDescription}`,
    //                 price: `${postPrice}`,
    //                 willDeliver: postDelivery
    //               }
    //             })
    //         });
    //         // setPostTitle('');
    //         // setPostDescription('');
    //         // setPostPrice('');
    //         // setPostDelivery(false);
    //         // getPosts();
    //     } catch {
    //         console.error('Oops, something went wrong')
    //     }
    // }

    // const sendMessage = async ({ token, postMessages, postid }) => {
    //     try {
    //         const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts/${postid}/messages`, {
    //             method: "POST",
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({
    //               message: {
    //                 content: `${postMessages[postid]}`
    //               }
    //             })
    //         })
    //         // postMessages[postid] = '';
    //         // getPosts();
    //     } catch {
    //         console.error('Oops, something went wrong')
    //     }
    // }

    // const deletePost = async ({ token, postid }) => {
    //     try {
    //         const response = await fetch(`https://strangers-things.herokuapp.com/api/${cohort}/posts/${postid}`, {
    //             method: "DELETE",
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${token}`
    //             }
    //           });
    //         //   getPosts();
    //     } catch {
    //         console.error('Oops, something went wrong')
    //     }
    // }
    
    useEffect(() => {
        const renderPosts = async () => {
            const newPosts = await getPosts();
            setPosts(newPosts);
        }
        renderPosts();
    }, [posts])

    return <div className="page">
        {
            token && <>
            <h1>Welcome {username}</h1>
            <h2>Create New Post</h2>
            <form className="createPost" onSubmit={event => {
                event.preventDefault();
                createPost({ token, postTitle, postDescription, postPrice, postDelivery });
                setPostTitle('');
                setPostDescription('');
                setPostPrice('');
                setPostDelivery(false);
                setPosts(posts);
            }}>
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
            <form className="searchPosts">
                <label id="searchLabel" htmlFor="search">Search for Posts:</label>
                <input
                        id="search"
                        type="text"
                        placeholder="enter your search..."
                        minLength="1"
                        required
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}/>
            </form>
            <h2>Available Posts</h2>
            </>
        }
        <section className="posts">
            {
                token ? postsToDisplay.map(post => {
                    return <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <h4>Description:</h4>
                        <p>{post.description}</p>
                        <h4>Price:</h4>
                        <p>{post.price}</p>
                        <h4>Delivery available?</h4>
                        <p>{post.willDeliver ? 'Yes' : 'No'}</p>
                        {
                            post.author.username === username && <button onClick={() => {
                                deletePost({token, postid: post._id});
                                setPosts(posts);
                            }}>Delete</button>
                        }
                        {
                            post.author.username !== username &&
                            <form className="sendMessage" onSubmit={event => {
                                event.preventDefault();
                                sendMessage({ token, postMessages, postid: post._id });
                                postMessages[post._id] = '';
                                setPosts(posts);
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
                                        postMessagesHolder[post._id] = event.target.value;
                                        setPostMessages(postMessagesHolder);
                                    }}></textarea>
                                <br/>
                                <button type="submit">Send</button>
                            </form>
                        }
                    </div>}
                ) : <h2>You are not logged in</h2>
            }
        </section>
    </div>
}

export default Posts