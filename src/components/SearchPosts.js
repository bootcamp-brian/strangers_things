import { useState } from "react";

const SearchPosts = ({ token, searchTerm, setSearchTerm }) => {

    return (
        token &&
        <form className="searchPosts">
            <label id="searchLabel" htmlFor="search">Search for Posts:</label>
            <input
                id="search"
                type="text"
                placeholder="enter your search..."
                minLength="1"
                required
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
            />
        </form>
    )
}

export default SearchPosts;