import { useOutletContext } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { getMessages } from "../utils/API";
import profilepic from "../images/profilepic.jpeg";

const Profile = () => {
    const [token] = useOutletContext();
    const [messages, setMessages] = useState([]);
    const { username } = jwt_decode(token);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadMessages = async () => {
            const data = await getMessages(token);
            setMessages(data.data.messages);
            setLoaded(true);
        }
        loadMessages();
    }, []);

    return <div className="page">
        <h1>{username}'s Profile:</h1>
        <img id="profilepic" src={profilepic} alt="profile pic"/>
        {
            loaded && <h2>Received Messages</h2>
        }
        {
            loaded && !messages.filter(message => message.fromUser.username !== username ? true : false).length ? <h3>You haven't received any messages</h3> : null
        }
        <section className="profileMessages">
            {
                messages.map(message => {
                    if (message.fromUser.username !== username) {
                        return <div key={message._id} className="profileMessage">
                            <h3>Re: {message.post.title}</h3>
                            <h4>From:</h4>
                            <p>{message.fromUser.username}</p>
                            <h4>Message:</h4>
                            <p>{message.content}</p>
                        </div>
                    }
                })
            }
        </section>
        
        {
            loaded && <h2>Sent Messages</h2>
        }
        {
            loaded && !messages.filter(message => message.fromUser.username !== username ? false : true).length ? <h3>You haven't sent any messages</h3> : null
        }
        <section className="profileMessages">
            {
                messages.map(message => {
                    if (message.fromUser.username === username) {
                        return <div key={message._id} className="profileMessage">
                            <h3>Re: {message.post.title}</h3>
                            <h4>Message:</h4>
                            <p>{message.content}</p>
                        </div>
                    }
                })
            }
        </section>
        
    </div>
}

export default Profile;