import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

import Auth from './Auth'

const Nav = () => {
  return (
    <Navbar className="justify-content-between" bg="dark" expand="lg" variant="dark" sticky="top">
      <NavLink to="/"><Navbar.Brand>NOZO</Navbar.Brand></NavLink>
      <div className="float-right">
        <Auth />
      </div>
    </Navbar>
  )
}

export default Nav
