import { useOutletContext } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { getMessages } from "../utils/API";

const Profile = () => {
    const [token] = useOutletContext();
    const [messages, setMessages] = useState([]);
    const { username } = jwt_decode(token);

    useEffect(() => {
        const loadMessages = async () => {
            const data = await getMessages(token);
            setMessages(data.data.messages);
        }
        loadMessages();
    }, []);

    return <div className="page">
        <h1>{username}'s Profile:</h1>
        <h2>Received Messages</h2>
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
        
        <h2>Sent Messages</h2>
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