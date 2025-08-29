import React, { useState } from 'react';
import { api } from '../api';

export function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const user = await api.login(username, password);
      onLogin(user);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container" style={{maxWidth:400, margin:'60px auto'}}>
      <h2 style={{textAlign:'center', fontWeight:800}}>Quality Hub Login</h2>
      <form onSubmit={submit} className="loginForm">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
