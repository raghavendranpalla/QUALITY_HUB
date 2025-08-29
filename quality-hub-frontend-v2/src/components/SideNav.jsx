import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Icon({children}){
  return (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">{children}</svg>
  )
}

const icons = {
  req: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13.5m0-13.5C10.832 5.477 9.346 5 7.75 5S4.668 5.477 3.5 6.253v13.5C4.668 19.477 6.154 19 7.75 19s3.082.477 4.25 1.253m0-13.5C13.168 5.477 14.654 5 16.25 5s3.082.477 4.25 1.253v13.5C19.332 19.477 17.846 19 16.25 19s-3.082.477-4.25 1.253"/></Icon>,
  design: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></Icon>,
  exec: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></Icon>,
  authors: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></Icon>,
  settings: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></Icon>,
  logout: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></Icon>
}

export function SideNav({appId, onLogout}){
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <div className={"sideNav" + (open?" open":"")} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <nav>
        <NavLink to={`/apps/${appId}/features`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.req}<span className="label">Requirements</span></NavLink>
        <NavLink to={`/apps/${appId}/test-design`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.design}<span className="label">Test Design</span></NavLink>
        <NavLink to={`/apps/${appId}/executions`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.exec}<span className="label">Test Execution</span></NavLink>
        <NavLink to={`/apps/${appId}/authors`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.authors}<span className="label">Authors</span></NavLink>
        <NavLink to={`/apps/${appId}/settings`} className={({isActive})=>"navItem"+(isActive?" active":"")}>{icons.settings}<span className="label">Settings</span></NavLink>
      </nav>
      <button className="navItem logout" onClick={()=>{onLogout(); nav('/');}}>{icons.logout}<span className="label">Logout</span></button>
    </div>
  )
}

