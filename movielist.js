import React from 'react';

function MovieList({ list }) {
  return (
    <div>
      <h3>{list.name}</h3>
      {list.movies.map(movie => (
        <div key={movie.imdbID}>
          <h4>{movie.title}</h4>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
