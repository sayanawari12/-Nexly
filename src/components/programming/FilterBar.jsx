import React from 'react';

const FilterBar = ({ filters, onFilterChange, categories }) => {
  return (
    <section className="filter-dropdowns-bar">
      <div className="filter-group">
        <label className="filter-label">Difficulty</label>
        <select
          value={filters.difficulty}
          onChange={(e) => onFilterChange('difficulty', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => cat !== 'all' && (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          value={filters.completed}
          onChange={(e) => onFilterChange('completed', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Bookmarked</label>
        <select
          value={filters.bookmarked}
          onChange={(e) => onFilterChange('bookmarked', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Programs</option>
          <option value="bookmarked">Bookmarked</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="filter-select"
        >
          <option value="Alphabetical">Alphabetical</option>
          <option value="Newest">Newest</option>
        </select>
      </div>
    </section>
  );
};

export default FilterBar;
