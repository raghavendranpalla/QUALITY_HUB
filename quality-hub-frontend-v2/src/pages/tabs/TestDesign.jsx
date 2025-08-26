import React, { useEffect, useState } from 'react'
import { api } from '../../api'

export function TestDesignTab({app}){
  const [features, setFeatures] = useState([])
  const [items, setItems] = useState([])

  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [status,setStatus] = useState('READY')
  const [priority,setPriority] = useState('MEDIUM')
  const [featureId, setFeatureId] = useState('')

  useEffect(()=>{ api.listFeatures(app.id).then(setFeatures); api.listTestCases(app.id).then(setItems) },[app.id])

  const add = async () => {
    if(!title) return
    const payload = { title, description:desc, status, priority, feature: featureId ? { id:Number(featureId) } : null }
    const res = await api.createTestCase(app.id, payload)
    setItems([...items, res]); setTitle(''); setDesc(''); setFeatureId('')
  }

  const del = async (id) => {
    await api.deleteTestCase(app.id, id)
    setItems(items.filter(x=>x.id !== id))
  }

  return (
    <div className="section">
      <h3>Test Design</h3>
      <div className="kpi">
        <input className="search" placeholder="Test title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select className="search" value={featureId} onChange={e=>setFeatureId(e.target.value)}>
          <option value="">(No Feature)</option>
          {features.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>
      <div className="kpi">
        <select className="search" value={status} onChange={e=>setStatus(e.target.value)}>
          <option>READY</option><option>DRAFT</option><option>DISABLED</option>
        </select>
        <select className="search" value={priority} onChange={e=>setPriority(e.target.value)}>
          <option>LOW</option><option>MEDIUM</option><option>HIGH</option>
        </select>
      </div>
      <textarea className="search" style={{minHeight:120}} placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <div style={{marginTop:10}}><button className="btn" onClick={add}>Add Test Case</button></div>

      <table className="table" style={{marginTop:16}}>
        <thead><tr><th>Title</th><th>Feature</th><th>Status</th><th>Priority</th><th></th></tr></thead>
        <tbody>
          {items.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.feature ? t.feature.name : '—'}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td><button className="btn" onClick={()=>del(t.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
