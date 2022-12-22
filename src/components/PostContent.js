import { useState } from "react";
import { deletePost, savePost, sendMessage } from "../utils/API";

const PostContent = ({ post, posts, setPosts, token, username }) => {
    const [postTitleEdit, setPostTitleEdit] = useState(post.title);
    const [postDescriptionEdit, setPostDescriptionEdit] = useState(post.description);
    const [postPriceEdit, setPostPriceEdit] = useState(post.price);
    const [postLocationEdit, setPostLocationEdit] = useState(post.location);
    const [postWillDeliverEdit, setPostWillDeliverEdit] = useState(post.willDeliver);
    const [postsCanEdit, setPostsCanEdit] = useState({});
    const postsCanEditHolder = {};
    const [postMessages, setPostMessages] = useState({});
    const postMessagesHolder = {};
    const [sentMessages, setSentMessages] = useState({});

    const toggleEdit = (postid) => {
        if (!postsCanEdit[postid]) {
            postsCanEditHolder[postid] = true;
        } else {
            postsCanEditHolder[postid] = false;
        }
        setPostsCanEdit(postsCanEditHolder);
    }

    const resetPostEdit = () => {
        setPostTitleEdit(post.title);
        setPostDescriptionEdit(post.description);
        setPostPriceEdit(post.price);
        setPostLocationEdit(post.location);
        setPostWillDeliverEdit(post.willDeliver);
    }
    if (postsCanEdit[post._id]) {
        return <>
            <h3>Title:</h3>
            <input
                id="postTitleEdit"
                type="text"
                value={postTitleEdit}
                onChange={event => setPostTitleEdit(event.target.value)}
            />
            <h4>Description:</h4>
            <textarea
                className="postDescriptionEdit"
                rows="5"
                cols="20"
                placeholder="enter your message here..."
                minLength="1"
                required
                value={postDescriptionEdit}
                onChange={event => setPostDescriptionEdit(event.target.value)}
            />
            <h4>Price:</h4>
            <input
                id="postPriceEdit"
                type="text"
                value={postPriceEdit}
                onChange={event => setPostPriceEdit(event.target.value)}
            />
            <h4>Location:</h4>
            <input
                id="postLocationEdit"
                type="text"
                value={postLocationEdit}
                onChange={event => setPostLocationEdit(event.target.value)}
            />
            <h4>Delivery available?</h4>
            <input
                id="postDeliveryEdit"
                type="checkbox"
                checked={postWillDeliverEdit}
                onChange={() => postWillDeliverEdit ? setPostWillDeliverEdit(false) : setPostWillDeliverEdit(true)}
            />
            <button type="button" onClick={() => {
                savePost(postTitleEdit, postDescriptionEdit, postPriceEdit, postLocationEdit, postWillDeliverEdit, token, post._id); 
                toggleEdit(post._id);
                setPosts(posts);
            }}>Save</button>
            <button type="button" onClick={() => {
                resetPostEdit();
                toggleEdit(post._id);
                setPosts(posts);
            }}>Cancel</button>
        </>
    } else {
        return <>
            <h3>{post.title}</h3>
            <h4>Description:</h4>
            <p>{post.description}</p>
            <h4>Price:</h4>
            <p>{post.price}</p>
            <h4>Location:</h4>
            <p>{post.location}</p>
            <h4>Delivery available?</h4>
            <p>{post.willDeliver ? 'Yes' : 'No'}</p>
            {
                post.author.username === username ?
                <>
                    <button type="button" onClick={() => {
                        toggleEdit(post._id);
                        setPosts(posts);
                    }}>Edit</button>
                    <button type="button" onClick={() => {
                        deletePost({token, postid: post._id});
                        setPosts(posts);
                    }}>Delete</button>
                </>
                :
                <form className="sendMessage" onSubmit={event => {
                    event.preventDefault();
                    sendMessage({ token, postMessages, postid: post._id });
                    postMessages[post._id] = '';
                    sentMessages[post._id] = 'Your message has been sent.'
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
                        }}
                    />
                    <br/>
                    <button type="submit">Send</button>
                    <p>{sentMessages[post._id]}</p>
                </form>
            }
        </>
    }
}

export default PostContent;