import React, { useState } from 'react'
import { api } from '../../api'

export function SettingsTab({app, onSaved}){
  const [name,setName] = useState(app.name)
  const [version,setVersion] = useState(app.version)
  const [desc,setDesc] = useState(app.description)
  const [active,setActive] = useState(app.active)

  const save = async () => {
    const payload = { name, versionStr: version, description: desc, active }
    const updated = await api.updateApplication(app.id, payload)
    onSaved && onSaved({ ...app, ...{ name, version, description: desc, active } })
    alert('Saved')
  }

  return (
    <div className="section">
      <h3>Settings</h3>
      <div className="kpi">
        <input className="search" value={name} onChange={e=>setName(e.target.value)} placeholder="Application name" />
        <input className="search" value={version} onChange={e=>setVersion(e.target.value)} placeholder="Version" />
      </div>
      <textarea className="search" style={{minHeight:120}} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
      <div style={{margin:'10px 0'}}>
        <label><input type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)} /> Active</label>
      </div>
      <button className="btn" onClick={save}>Save</button>
    </div>
  )
}
