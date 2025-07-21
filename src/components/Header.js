import React from 'react'

export default function Header (props) {
  return (
    
      <nav className="bg-dark text-white text-aside py-3 mt-0 transition-all">
 <a className="navbar-brand text-white fw-bold fs-2 fst-italic">
{props.title}</a>
  
</nav>
    
  )
}
