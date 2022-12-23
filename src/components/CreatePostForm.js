import { createPost } from "../utils/API";
import { useState } from "react";

const CreatePostForm = ({ posts, setPosts, token, username }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [postDelivery, setPostDelivery] = useState(false);

    return (
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
                    onChange={event => setPostTitle(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="postPrice">Price:</label>
                <br/>
                <input
                    id="postPrice"
                    type="text"
                    placeholder="enter price..."
                    minLength="1"
                    required
                    value={postPrice}
                    onChange={event => setPostPrice(event.target.value)}
                />
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
                    onChange={event => setPostDescription(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="postLocation">Location:</label>
                <br/>
                <input
                    id="postLocation"
                    type="text"
                    placeholder="enter location..."
                    minLength="1"
                    required
                    value={postLocation}
                    onChange={event => setPostLocation(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="postDelivery">Are you willing to deliver?</label>
                <br/>
                <input
                    id="postDelivery"
                    type="checkbox"
                    checked={postDelivery}
                    onChange={() => postDelivery ? setPostDelivery(false) : setPostDelivery(true)}
                />
            </section>
            <button type="submit">Submit Post</button>
        </form>
        </>
    )
}

export default CreatePostForm;