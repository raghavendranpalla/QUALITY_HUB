import React, { useEffect, useState } from 'react'
import { api } from '../../api'
import { PassRing } from '../../components/PassRing'

export function DashboardTab({app}){
  const [executions, setExecutions] = useState([])

  useEffect(()=>{ api.listExecutions(app.id).then(setExecutions) }, [app.id])

  const total = executions.length
  const passed = executions.filter(e => e.status === 'PASSED').length
  const failed = executions.filter(e => e.status === 'FAILED').length
  const skipped = executions.filter(e => e.status === 'SKIPPED').length
  const passRate = total ? Math.round(passed/total*100) : 0

  const grouped = executions.reduce((acc, e) => {
    const name = e.testCase?.title || `Test ${e.id}`
    acc[name] = acc[name] || []
    acc[name].push(e)
    acc[name].sort((a,b)=> new Date(b.executedAt) - new Date(a.executedAt))
    return acc
  }, {})

  const stable = []
  const stabilizing = []
  const risk = []

  Object.entries(grouped).forEach(([name, runs]) => {
    const last5 = runs.slice(0,5).map(r => r.status)
    if(last5.length < 5) return
    if(last5.every(s => s === 'PASSED')) stable.push(name)
    else if(last5.every(s => s === 'FAILED')) risk.push(name)
    else stabilizing.push(name)
  })

  return (
    <div className="section">
      <h3>Recent Execution</h3>
      <div className="kpi">
        <div className="box"><div className="small">Total</div><div style={{fontSize:22,fontWeight:800}}>{total}</div></div>
        <div className="box"><div className="small">Passed</div><div style={{fontSize:22,fontWeight:800}}>{passed}</div></div>
        <div className="box"><div className="small">Failed</div><div style={{fontSize:22,fontWeight:800}}>{failed}</div></div>
        <div className="box"><div className="small">Skipped</div><div style={{fontSize:22,fontWeight:800}}>{skipped}</div></div>
        <div className="box" style={{display:'flex',alignItems:'center',gap:10}}>
          <PassRing value={passRate} />
          <div><div className="small">Pass Rate</div><div style={{fontSize:18,fontWeight:800}}>{passRate}%</div></div>
        </div>
      </div>

      <table className="table" style={{marginTop:16}}>
        <thead><tr><th>Test Case</th><th>Status</th><th>Executed At</th></tr></thead>
        <tbody>
          {executions.slice(0,5).map(e => (
            <tr key={e.id}>
              <td>{e.testCase?.title || e.id}</td>
              <td>{e.status}</td>
              <td>{new Date(e.executedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{marginTop:24}}>Historical Results</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16}}>
        <div>
          <div style={{fontWeight:700}}>Stable</div>
          <ul>{stable.length ? stable.map(n => <li key={n}>{n}</li>) : <li className="small">No data</li>}</ul>
        </div>
        <div>
          <div style={{fontWeight:700}}>Stabilizing</div>
          <ul>{stabilizing.length ? stabilizing.map(n => <li key={n}>{n}</li>) : <li className="small">No data</li>}</ul>
        </div>
        <div>
          <div style={{fontWeight:700}}>Risk Zone</div>
          <ul>{risk.length ? risk.map(n => <li key={n}>{n}</li>) : <li className="small">No data</li>}</ul>
        </div>
      </div>
    </div>
  )
}
