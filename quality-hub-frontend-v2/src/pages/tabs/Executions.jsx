import React, { useEffect, useState } from 'react'
import { api } from '../../api'

export function ExecutionsTab({app}){
  const [tests, setTests] = useState([])
  const [items, setItems] = useState([])
  const [testId, setTestId] = useState('')
  const [status, setStatus] = useState('PASSED')

  useEffect(()=>{ api.listTestCases(app.id).then(setTests); api.listExecutions(app.id).then(setItems) },[app.id])

  const run = async () => {
    if(!testId) return alert('Pick a test')
    const payload = { status, durationMs: Math.floor(700 + Math.random()*600), testCase: { id:Number(testId) } }
    const e = await api.createExecution(app.id, payload)
    setItems([e, ...items])
  }

  return (
    <div className="section">
      <h3>Test Executions</h3>
      <div className="kpi">
        <select className="search" value={testId} onChange={e=>setTestId(e.target.value)}>
          <option value="">Select test case…</option>
          {tests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
        <select className="search" value={status} onChange={e=>setStatus(e.target.value)}>
          <option>PASSED</option><option>FAILED</option><option>SKIPPED</option>
        </select>
        <button className="btn" onClick={run}>Record Execution</button>
      </div>
      <table className="table" style={{marginTop:16}}>
        <thead><tr><th>Time</th><th>Test</th><th>Status</th><th>Duration</th></tr></thead>
        <tbody>
          {items.map(e => (
            <tr key={e.id}>
              <td>{new Date(e.executedAt).toLocaleString()}</td>
              <td>{e.testCase ? e.testCase.title : '—'}</td>
              <td>{e.status}</td>
              <td>{e.durationMs} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
