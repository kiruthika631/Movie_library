import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';

function Home() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/lists', {
        headers: {
          'x-auth-token': token
        }
      });
      setLists(res.data);
    };
    fetchLists();
  }, []);

  return (
    <div>
      <h2>Your Movie Lists</h2>
      <MovieSearch />
      {lists.map(list => (
        <MovieList key={list._id} list={list} />
      ))}
    </div>
  );
}

export default Home;
