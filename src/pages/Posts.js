import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getPosts } from '../utils/API';
import PostContent from '../components/PostContent';
import CreatePostForm from '../components/CreatePostForm';
import SearchPosts from '../components/SearchPosts';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [token] = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');
    const { username } = token ? jwt_decode(token) : '';

    function postMatches(post, text) {
        const title = post.title.toLowerCase();
        const description = post.description.toLowerCase();
        const price = post.price.toLowerCase();
        const search = text.toLowerCase();
        
        if (title.includes(search) || description.includes(search) || price.includes(search)) {
            return true;
        } else {
            return false;
        }
    }
      
    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;
    
    useEffect(() => {
        const renderPosts = async () => {
            const newPosts = await getPosts();
            setPosts(newPosts);
        }
        renderPosts();
    }, [posts])

    return <div className="page">
        {
            token ? <h1>Welcome to Stranger's Things {username}</h1> : <h1>Welcome to Stranger's Things</h1>
        }
        {
            !token && <h2>Please login or register to interact with posts</h2>
        }
        <CreatePostForm posts={posts} setPosts={setPosts} token={token} username={username} />
        <h2>Available Posts:</h2>
        <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="posts">
            {
                postsToDisplay.map(post => {
                    return <div key={post._id} className="post">
                        <PostContent post={post} posts={posts} setPosts={setPosts} token={token} username={username} />
                    </div>}
                )
            }
        </section>
    </div>
}

export default Posts;
