import { useOutletContext, Link } from "react-router-dom";

const Home = () => {
    const [token] = useOutletContext();

    return <div className="page">
        <h1>Welcome to Stranger's Things</h1>
        {
            !token && <h2>Please login or register</h2>
        }
    </div>
}

export default Home;