import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getPosts } from '../utils/API';
import PostContent from '../components/PostContent';
import CreatePostForm from '../components/CreatePostForm';
import SearchPosts from '../components/SearchPosts';

const cohort = '2209-ftb-pt-web-pt';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [token] = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');
    const { username } = token ? jwt_decode(token) : '';


    function postMatches(post, text) {
        if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text)) {
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
        <CreatePostForm posts={posts} setPosts={setPosts} token={token} username={username} />
        {
            token && <h2>Available Posts</h2>
        }
        <SearchPosts token={token} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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

export default Posts