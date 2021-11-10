import React from 'react'
import PropTypes from 'prop-types'

const Navbar = props => {
    return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i> Qontec IoT </a>
      </h1>
      <ul>
        <li><a href="profiles.html">Dashboard</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
    )
}

Navbar.propTypes = {

}

export default Navbar
