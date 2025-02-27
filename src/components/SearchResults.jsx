// src/components/SearchResults.jsx
function SearchResults({ results, onSelectBook, searchQuery }) {
    if (results.length === 0) {
      return <p className="text-center text-gray-600">No books found.</p>;
    }
  
    return (
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
          <p className="text-sm text-gray-600">
            {results.length} books found for "{searchQuery}"
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((book) => {
            const { id, volumeInfo } = book;
            const thumbnail = volumeInfo.imageLinks?.thumbnail || 
                            volumeInfo.imageLinks?.smallThumbnail || 
                            '/placeholder-book.png';
            
            // Truncate long titles
            const title = volumeInfo.title || 'Unknown Title';
            const displayTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;
            
            return (
              <div 
                key={id} 
                className="flex flex-col bg-white rounded-lg shadow-card hover:shadow-card-hover transform hover:-translate-y-1 transition-all cursor-pointer overflow-hidden border border-gray-200"
                onClick={() => onSelectBook(id)}
              >
                <div className="h-48 flex items-center justify-center bg-gray-100">
                  <img
                    src={thumbnail.replace('http:', 'https:')}
                    alt={`${title} cover`}
                    className="h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{displayTitle}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
                  </p>
                  {volumeInfo.publishedDate && (
                    <p className="text-xs text-gray-500 mt-auto">
                      {volumeInfo.publishedDate.substring(0, 4)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default SearchResults;