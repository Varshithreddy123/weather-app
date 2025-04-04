import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setIsSearching(true);
    try {
      await onSearch(city);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter city name (e.g., London, New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isSearching}
        />
        <button 
          type="submit" 
          disabled={isSearching || !city.trim()}
          aria-label="Search"
        >
          {isSearching ? (
            <FaSpinner className="spinner" />
          ) : (
            <FaSearch />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;