import React, { useEffect, useState } from 'react'
import { api } from '../../api'

export function FeaturesTab({app}){
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{ api.listFeatures(app.id).then(setItems) },[app.id])

  const add = async () => {
    if(!name) return
    const f = await api.createFeature(app.id, { name, description })
    setItems([...items, f]); setName(''); setDescription('')
  }

  return (
    <div className="section">
      <h3>Features</h3>
      <div className="kpi" style={{marginBottom:12}}>
        <input className="search" placeholder="Feature name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="search" placeholder="Short description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button className="btn" onClick={add}>Add</button>
      </div>
      <table className="table">
        <thead><tr><th>Name</th><th>Description</th></tr></thead>
        <tbody>{items.map(f => <tr key={f.id}><td>{f.name}</td><td>{f.description}</td></tr>)}</tbody>
      </table>
    </div>
  )
}
