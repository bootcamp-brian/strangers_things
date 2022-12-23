import { useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { getPosts } from '../utils/API';
import PostContent from "../components/PostContent";
import profilepic from "../images/profilepic.jpeg"

const PublicProfile = () => {
    const usernameParam = useParams();
    const [posts, setPosts] = useState([]);
    const [token] = useOutletContext();
    const { username } = token ? jwt_decode(token) : '';

    function findUserPosts(post) {
        if (post.author.username === usernameParam.username) {
            return true;
        } else {
            return false;
        }
    }
      
    const postsToDisplay = posts.filter(post => findUserPosts(post));
    
    useEffect(() => {
        const renderPosts = async () => {
            const newPosts = await getPosts();
            setPosts(newPosts);
        }
        renderPosts();
    }, [posts])

    return <div className="page">
        <h1>{usernameParam.username}'s Public Profile</h1>
        <img id="profilepic" src={profilepic} alt="profile pic"/>
        <h2>{usernameParam.username}'s Posts</h2>
        <section className="posts">
            {
                token ? postsToDisplay.map(post => {
                    return <div key={post._id} className="post">
                        <PostContent post={post} posts={posts} setPosts={setPosts} token={token} username={username} />
                    </div>}
                ) : <h2>You are not logged in</h2>
            }
        </section>
    </div>
}

export default PublicProfile