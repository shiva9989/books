// src/components/SearchForm.jsx
import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="flex-1 p-3 sm:p-4 border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none"
          aria-label="Search for books"
        />
        <button 
          type="submit" 
          className="bg-primary-600 text-white p-3 sm:p-4 font-medium hover:bg-primary-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;