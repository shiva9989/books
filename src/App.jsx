// src/App.jsx
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const API_KEY = import.meta.env.API_KEY;

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSelectedBook(null);
    setSearchQuery(query);
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (err) {
      setError('Error fetching book data. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = async (bookId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      
      const data = await response.json();
      setSelectedBook(data);
    } catch (err) {
      setError('Error fetching book details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-800 mb-6">Book Explorer</h1>
        <SearchForm onSearch={handleSearch} />
      </header>
      
      {loading && (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm text-gray-600">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your Book discoveries...
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 mb-6">
          <span className="mr-2">😕</span> {error}
        </div>
      )}
      
      {!selectedBook && searchResults.length > 0 && (
        <SearchResults 
          results={searchResults} 
          onSelectBook={handleSelectBook} 
          searchQuery={searchQuery}
        />
      )}
      
      {selectedBook && (
        <>
          <button 
            className="inline-flex items-center mb-6 text-primary-600 hover:text-primary-800 font-medium"
            onClick={() => setSelectedBook(null)}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Results
          </button>
          <BookDetails book={selectedBook} />
        </>
      )}
      
      {!loading && !error && searchResults.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <h2 className="text-xl mb-2">No books found</h2>
          <p className="text-gray-600">Try adjusting your search terms or try a different query.</p>
        </div>
      )}
    </div>
  );
}

export default App;