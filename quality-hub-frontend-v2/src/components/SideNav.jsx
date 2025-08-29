import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Icon({children}){
  return (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{children}</svg>
  )
}

const icons = {
  home: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></Icon>,
  req: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></Icon>,
  design: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></Icon>,
  exec: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></Icon>,
  bugs: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904a1.5 1.5 0 012.374 0M15.75 11.25v-.917a4.5 4.5 0 00-4.5-4.5h-2.5a4.5 4.5 0 00-4.5 4.5v.917m11.5 0h2.625m-14.125 0H3.125m12.625 0v4.5a2.25 2.25 0 01-2.25 2.25h-6.25a2.25 2.25 0 01-2.25-2.25v-4.5m11.5 0h-11.5"/></Icon>,
  authors: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></Icon>,
  settings: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></Icon>,
  logout: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></Icon>
}

export function SideNav({appId, onLogout}){
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <div className={"sideNav" + (open?" open":"")} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <div className="logo" onClick={()=>nav('/')}>QH</div>
      <nav>
        <NavLink end to={`/apps/${appId}`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.home}<span className="label">Dashboard</span></NavLink>
        <NavLink to={`/apps/${appId}/features`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.req}<span className="label">Requirements</span></NavLink>
        <NavLink to={`/apps/${appId}/test-design`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.design}<span className="label">Test Design</span></NavLink>
        <NavLink to={`/apps/${appId}/executions`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.exec}<span className="label">Test Execution</span></NavLink>
        <NavLink to={`/apps/${appId}/bugs`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.bugs}<span className="label">Bugs</span></NavLink>
        <NavLink to={`/apps/${appId}/authors`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.authors}<span className="label">Authors</span></NavLink>
        <NavLink to={`/apps/${appId}/settings`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.settings}<span className="label">Settings</span></NavLink>
      </nav>
      <button className="navItem logout" onClick={()=>{onLogout(); nav('/');}}>{icons.logout}<span className="label">Logout</span></button>
    </div>
  )
}

