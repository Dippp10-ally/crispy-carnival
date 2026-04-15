import React, { useState } from 'react';

const CardGenerator = () => {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setUsername(value);
        if (value) {
            fetch(`https://api.github.com/search/users?q=${value}`)
                .then(response => response.json())
                .then(data => {
                    setSuggestions(data.items || []);
                });
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (user) => {
        setUsername(user.login);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the profile card generation
        alert(`Generating card for ${username}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Search GitHub users"
                    autoComplete="off"
                />
                <button type="submit">Generate Card</button>
            </form>
            <ul>
                {suggestions.map((user) => (
                    <li key={user.id} onClick={() => handleSuggestionClick(user)}>
                        {user.login}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardGenerator;
