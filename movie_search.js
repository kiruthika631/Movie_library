import React, { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = e => setQuery(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/movies/search?query=${query}`);
      setResults(res.data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={query} onChange={onChange} placeholder="Search for movies..." />
        <input type="submit" value="Search" />
      </form>
      <div>
        {results && results.map(movie => (
          <div key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
