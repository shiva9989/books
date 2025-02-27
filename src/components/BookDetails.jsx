// src/components/BookDetails.jsx
function BookDetails({ book }) {
    const { volumeInfo } = book;
    const thumbnail = volumeInfo.imageLinks?.thumbnail || 
                    volumeInfo.imageLinks?.smallThumbnail || 
                    '/placeholder-book.png';
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <img 
                src={thumbnail.replace('http:', 'https:')} 
                alt={`${volumeInfo.title} cover`} 
                className="w-full md:w-48 rounded-md shadow-md mx-auto"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{volumeInfo.title}</h2>
              {volumeInfo.subtitle && (
                <h3 className="text-lg text-gray-600 mb-3 font-normal italic">{volumeInfo.subtitle}</h3>
              )}
              
              <p className="text-gray-800 mb-3 font-medium">
                By: {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
              </p>
              
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-lg">
                    {renderStars(volumeInfo.averageRating || 0)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {volumeInfo.averageRating ? `${volumeInfo.averageRating.toFixed(1)}/5` : 'No ratings yet'}
                    {volumeInfo.ratingsCount ? ` (${volumeInfo.ratingsCount.toLocaleString()} ratings)` : ''}
                  </span>
                </div>
              </div>
              
              {(volumeInfo.publisher || volumeInfo.publishedDate) && (
                <p className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="mr-2">📖</span>
                  {volumeInfo.publisher ? `${volumeInfo.publisher}` : ''}
                  {volumeInfo.publishedDate ? ` (${formatDate(volumeInfo.publishedDate)})` : ''}
                </p>
              )}
              
              {volumeInfo.categories && volumeInfo.categories.length > 0 && (
                <p className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-1">🏷️</span>
                  <span>{volumeInfo.categories.join(', ')}</span>
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">About this Book</h3>
            {volumeInfo.description ? (
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: volumeInfo.description }} 
              />
            ) : (
              <p className="text-gray-600 italic">No description available for this book.</p>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-600 flex flex-wrap gap-4">
            {volumeInfo.pageCount && (
              <p className="flex items-center">
                <span className="mr-2">📄</span>
                {volumeInfo.pageCount} pages
              </p>
            )}
            
            {volumeInfo.language && (
              <p className="flex items-center">
                <span className="mr-2">🌐</span>
                {languageCodeToName(volumeInfo.language)}
              </p>
            )}
            
            {volumeInfo.industryIdentifiers && volumeInfo.industryIdentifiers.length > 0 && (
              <p className="flex items-center">
                <span className="mr-2">🔢</span>
                {volumeInfo.industryIdentifiers
                  .filter(id => id.type.includes('ISBN'))
                  .map(id => `ISBN: ${id.identifier}`)
                  .join(', ')}
              </p>
            )}
          </div>
          
          {volumeInfo.previewLink && (
            <div className="mt-6">
              <a 
                href={volumeInfo.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
              >
                Preview on Google Books
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  function renderStars(rating) {
    const fullStar = "★";
    const emptyStar = "☆";
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    let stars = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars += fullStar;
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars += '½';
    }
    
    // Fill the rest with empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += emptyStar;
    }
    
    return stars;
  }
  
  function languageCodeToName(code) {
    const languages = {
      'en': 'English',
      'fr': 'French',
      'es': 'Spanish',
      'de': 'German',
      'ja': 'Japanese',
      'zh': 'Chinese',
      'ru': 'Russian',
      'it': 'Italian',
      'pt': 'Portuguese',
      'nl': 'Dutch',
      'ko': 'Korean',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'sv': 'Swedish',
      'no': 'Norwegian'
    };
    
    return languages[code] || code.toUpperCase();
  }
  
  function formatDate(dateString) {
    if (!dateString) return '';
    
    const parts = dateString.split('-');
    if (parts.length === 1) return parts[0]; // Just year
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: parts.length > 2 ? 'numeric' : undefined
      }).format(date);
    } catch (e) {
      return dateString; // Fallback to original string on error
    }
  }
  
  export default BookDetails;