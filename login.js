import React, { useState } from 'react';
import axios from 'axios';

function Login({ history }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signin', formData);
      localStorage.setItem('token', res.data.token);
      history.push('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required />
      <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
