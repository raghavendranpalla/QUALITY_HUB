import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../api'
import { PassRing } from '../components/PassRing'

function useQuery(){
  const { search } = useLocation()
  return useMemo(()=> Object.fromEntries(new URLSearchParams(search)), [search])
}

function Card({app}){
  return (
    <div className="card cardGlow">
      <div className="cardHead">
        <div className="cardTitle">{app.name}</div>
        <div className="cardSub">Version {app.version}</div>
        {app.active && <div className="activePill">active</div>}
      </div>
      <div className="cardBody">
        <div style={{minHeight:44, color:'#bcd', marginBottom:10}}>{app.description || '—'}</div>
        <div className="stats">
          <div className="stat"><div className="label">Test Cases</div><div className="value">{app.testCases}</div></div>
          <div className="stat"><div className="label">Executions</div><div className="value">{app.executions}</div></div>
        </div>
      </div>
      <div className="cardFoot">
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <PassRing value={app.passRate||0} />
          <div className="small">Pass Rate</div>
        </div>
        <Link to={`/apps/${app.id}`} className="link">Open ➜</Link>
      </div>
    </div>
  )
}

export function ApplicationsList(){
  const [data, setData] = useState(null)
  const q = useQuery().q || ''
  useEffect(()=>{ api.listApplications(q).then(setData)}, [q])
  return (
    <div className="container">
      {!data ? (
        <div className="grid">
          <div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
        </div>
      ) : (
        <div className="grid">{data.map(app => <Card key={app.id} app={app} />)}</div>
      )}
    </div>
  )
}
