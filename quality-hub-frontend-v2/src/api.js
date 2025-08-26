const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'
const MOCK = import.meta.env.VITE_MOCK === '1'

function sleep(ms){ return new Promise(r => setTimeout(r, ms)) }

async function request(path, opts={}){
  if(!MOCK){
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type':'application/json' }, credentials:'include', ...opts
    })
    if(!res.ok){ throw new Error(`${res.status} ${res.statusText}`) }
    return res.json()
  } else {
    // Minimal mock payloads to preview the UI with great graphics
    await sleep(300)
    if(path.startsWith('/entities/Application')){
      if(path === '/entities/Application'){
        return [
          { id:1, name:'E-Commerce Platform', version:'2.4.1', description:'Main customer-facing web application for online shopping', active:true, updatedAt:new Date().toISOString(), testCases:12, executions:18, passRate:67 },
          { id:2, name:'Admin Dashboard', version:'1.8.3', description:'Internal management system for store operations', active:true, updatedAt:new Date().toISOString(), testCases:7, executions:9, passRate:55 },
          { id:3, name:'Mobile App API', version:'3.1.0', description:'RESTful API serving the mobile applications', active:true, updatedAt:new Date().toISOString(), testCases:4, executions:3, passRate:0 }
        ]
      }
      const id = Number(path.split('/').pop())
      return { id, name: id===1?'E-Commerce Platform': id===2?'Admin Dashboard':'Mobile App API', version:id===1?'2.4.1':id===2?'1.8.3':'3.1.0', description:'Mocked app', active:true, updatedAt:new Date().toISOString(), testCases:10, executions:16, passRate:62 }
    }
    if(path.includes('/features')){
      return [{id:1,name:'Cart & Checkout',description:'Cart, checkout, and payments'},
              {id:2,name:'Catalog & PDP',description:'Product search and PDP'}]
    }
    if(path.includes('/testcases')){
      return [
        {id:1,title:'Guest checkout with credit card',status:'READY',priority:'HIGH', feature:{id:1,name:'Cart & Checkout'}},
        {id:2,title:'PDP inventory badge',status:'READY',priority:'MEDIUM', feature:{id:2,name:'Catalog & PDP'}},
      ]
    }
    if(path.includes('/executions')){
      return [
        {id:1,status:'PASSED',durationMs:842,executedAt:new Date().toISOString(), testCase:{title:'Guest checkout'}},
        {id:2,status:'FAILED',durationMs:915,executedAt:new Date(Date.now()-3600_000).toISOString(), testCase:{title:'PDP badge'}},
      ]
    }
    if(path.startsWith('/activity')){
      const now = Date.now()
      return Array.from({length:20}).map((_,i)=>({
        id:i+1, ts:new Date(now-i*30000).toISOString(), method:'GET', path:i%4===0?'/api/entities/Application':'/api/integration-endpoints/schema', status:200, durationMs:50+i
      }))
    }
    if(path.startsWith('/integration-endpoints/schema')){
      return [{path:'/api/entities/Application', methods:['GET','POST','PUT']},{path:'/api/apps/{appId}/testcases', methods:['GET','POST','PUT','DELETE']}]
    }
    return []
  }
}

export const api = {
  listApplications: (q) => request(`/entities/Application${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  getApplication: (id) => request(`/entities/Application/${id}`),
  createApplication: (payload) => request(`/entities/Application`, { method:'POST', body: JSON.stringify(payload) }),
  updateApplication: (id, payload) => request(`/entities/Application/${id}`, { method:'PUT', body: JSON.stringify(payload) }),
  listFeatures: (appId) => request(`/apps/${appId}/features`),
  createFeature: (appId, payload) => request(`/apps/${appId}/features`, { method:'POST', body: JSON.stringify(payload) }),
  listTestCases: (appId, fId) => request(`/apps/${appId}/testcases${fId?`?featureId=${fId}`:''}`),
  createTestCase: (appId, payload) => request(`/apps/${appId}/testcases`, { method:'POST', body: JSON.stringify(payload) }),
  updateTestCase: (appId, id, payload) => request(`/apps/${appId}/testcases/${id}`, { method:'PUT', body: JSON.stringify(payload) }),
  deleteTestCase: (appId, id) => request(`/apps/${appId}/testcases/${id}`, { method:'DELETE' }),
  listExecutions: (appId) => request(`/apps/${appId}/executions`),
  createExecution: (appId, payload) => request(`/apps/${appId}/executions`, { method:'POST', body: JSON.stringify(payload) }),
  activity: () => request(`/activity`),
  schema: () => request(`/integration-endpoints/schema`)
}
