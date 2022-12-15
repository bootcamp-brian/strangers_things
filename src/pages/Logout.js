const Logout = () => {
    localStorage.removeItem('token');

    return <h1>You have logged out</h1>
}

export default Logout