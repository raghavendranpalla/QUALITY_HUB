import React, { useEffect, useState } from 'react'
import { api } from '../../api'
import { PassRing } from '../../components/PassRing'

export function DashboardTab({app}){
  const [activity, setActivity] = useState([])
  const [schema, setSchema] = useState([])
  const [counts, setCounts] = useState({requirements:0, testCases:0})

  useEffect(()=>{
    api.activity().then(setActivity)
    api.schema().then(setSchema)
  },[])

  useEffect(()=>{
    Promise.all([api.listFeatures(app.id), api.listTestCases(app.id)]).then(([f,t])=>{
      setCounts({requirements:f.length, testCases:t.length})
    })
  },[app.id])

  return (
    <div className="section">
      <div className="kpi">
        <div className="box"><div className="small">Requirements</div><div style={{fontSize:22,fontWeight:800}}>{counts.requirements}</div></div>
        <div className="box"><div className="small">Test Cases</div><div style={{fontSize:22,fontWeight:800}}>{counts.testCases}</div></div>
        <div className="box"><div className="small">Executions</div><div style={{fontSize:22,fontWeight:800}}>{app.executions}</div></div>
        <div className="box" style={{display:'flex',alignItems:'center',gap:10}}>
          <PassRing value={app.passRate} /><div><div className="small">Pass Rate</div><div style={{fontSize:18,fontWeight:800}}>{app.passRate}%</div></div>
        </div>
      </div>

      <h3 style={{marginTop:24}}>Activity Monitor</h3>
      <table className="table">
        <thead><tr><th>Time</th><th>Method</th><th>Path</th><th>Status</th><th>Duration</th></tr></thead>
        <tbody>
          {activity.slice(0,50).map(row => (
            <tr key={row.id}>
              <td>{new Date(row.ts).toLocaleTimeString()}</td>
              <td>{row.method}</td>
              <td>{row.path}</td>
              <td>{row.status}</td>
              <td>{row.durationMs} ms</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{marginTop:24}}>Integration Endpoints</h3>
      <table className="table">
        <thead><tr><th>Path</th><th>Methods</th></tr></thead>
        <tbody>
          {schema.map((s,i)=>(<tr key={i}><td>{s.path}</td><td>{Array.isArray(s.methods) ? s.methods.join(', ') : s.methods}</td></tr>))}
        </tbody>
      </table>
    </div>
  )
}
