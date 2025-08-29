import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ApplicationsList } from './pages/ApplicationsList'
import { ApplicationDetail } from './pages/ApplicationDetail'
import { Login } from './pages/Login'
import { api } from './api'

function Logo(){ return <div className="logo" /> }

function Header({onLogout}){
  const [q,setQ] = useState('')
  const nav = useNavigate()

  const createApp = async () => {
    const name = prompt('Application name')
    if(!name) return
    await api.createApplication({ name, versionStr:'0.1.0', description:'' })
    nav(0)
  }

  return (
    <div className="container">
      <div className="header">
        <div className="h1"><Logo /> Quality Hub</div>
        <div className="searchWrap">
          <svg className="searchIcon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input className="search" placeholder="Search applications…" value={q} onChange={e=>setQ(e.target.value)}
            onKeyDown={e=> e.key==='Enter' && nav(`/?q=${encodeURIComponent(q)}`)} />
        </div>
        <button className="btn" onClick={createApp}>+ New Application</button>
        {onLogout && <button className="btn" onClick={onLogout}>Logout</button>}
      </div>
      <div className="hero">
        <div>
          <div style={{fontWeight:800, fontSize:18}}>Your comprehensive testing management platform</div>
          <div className="sub">Track features, design test cases, record executions & visualize outcomes.</div>
        </div>
        <div className="badge">Dark UI • Gradient • Glass</div>
      </div>
    </div>
  )
}

export default function App(){
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  });
  const handleLogin = (u) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if(!user){
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ApplicationsList />} />
        <Route path="/apps/:id/*" element={<ApplicationDetail onLogout={handleLogout} />} />
      </Routes>
      <div className="footer">© Quality Hub</div>
    </>
  )
}
