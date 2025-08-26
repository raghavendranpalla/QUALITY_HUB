import React from 'react'

export function PassRing({value=0}){
  const radius = 18
  const circ = 2*Math.PI*radius
  const offset = circ - (value/100)*circ
  const color = value>0 ? '#10B981' : '#ef4444'
  return (
    <svg className="ring" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={radius} stroke="#1f2937" strokeWidth="4" fill="transparent"/>
      <circle cx="22" cy="22" r={radius} stroke={color} strokeWidth="4" fill="transparent"
              strokeDasharray={`${circ} ${circ}`} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="22" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill="#d1fae5">{value}%</text>
    </svg>
  )
}
