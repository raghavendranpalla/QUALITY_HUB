import React, { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import { api } from '../api'
import { DashboardTab } from './tabs/Dashboard'
import { FeaturesTab } from './tabs/Features'
import { TestDesignTab } from './tabs/TestDesign'
import { ExecutionsTab } from './tabs/Executions'
import { SettingsTab } from './tabs/Settings'

export function ApplicationDetail(){
  const { id } = useParams()
  const [app, setApp] = useState(null)

  useEffect(()=>{ api.getApplication(id).then(setApp) },[id])
  if(!app) return <div className="container"><div className="skeleton"/></div>

  return (
    <div className="container">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div className="small">Application</div>
          <div style={{fontSize:28,fontWeight:800}}>{app.name} <span className="tag">v{app.version}</span></div>
        </div>
        <div className="badge">Updated {new Date(app.updatedAt).toLocaleString()}</div>
      </div>
      <div className="layout" style={{marginTop:12}}>
        <aside className="sidebar">
          <NavLink end to={''} className={({isActive})=> 'sideLink'+(isActive?' active':'')}>Overview</NavLink>
          <NavLink to={'features'} className={({isActive})=> 'sideLink'+(isActive?' active':'')}>Features</NavLink>
          <NavLink to={'test-design'} className={({isActive})=> 'sideLink'+(isActive?' active':'')}>Test Design</NavLink>
          <NavLink to={'executions'} className={({isActive})=> 'sideLink'+(isActive?' active':'')}>Executions</NavLink>
          <NavLink to={'settings'} className={({isActive})=> 'sideLink'+(isActive?' active':'')}>Settings</NavLink>
        </aside>
        <main>
          <Routes>
            <Route index element={<DashboardTab app={app} />} />
            <Route path="features" element={<FeaturesTab app={app} />} />
            <Route path="test-design" element={<TestDesignTab app={app} />} />
            <Route path="executions" element={<ExecutionsTab app={app} />} />
            <Route path="settings" element={<SettingsTab app={app} onSaved={setApp} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
