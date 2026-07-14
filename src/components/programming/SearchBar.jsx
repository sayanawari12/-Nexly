import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <section className="search-filter-section">
      <div className="search-box-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search programs by name, tags, category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </section>
  );
};

export default SearchBar;
