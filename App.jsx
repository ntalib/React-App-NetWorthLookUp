import React, { useState, useEffect } from 'react';

function CelebritySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
          {
            headers: {
              'X-Api-Key': 'INSERT_OWN_APIKEY_from api-ninjas'
            }
          }
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    if (searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <div>
      <form>
        <label htmlFor="search">Search for a Celebrity Net Worth:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </form>
      {error && <div>{error.message}</div>}
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        searchResults.map(result => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            <p>Celebrity Net Worth: {result.net_worth}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CelebritySearch;
