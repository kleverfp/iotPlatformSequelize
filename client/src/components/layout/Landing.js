import React from 'react'
import PropTypes from 'prop-types'

const Landing = props => {
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">IoT Platform</h1>
            <p className="lead">
             Connect all sensors unique platform
            </p>
            <div className="buttons">
              <a href="register.html" className="btn btn-primary">Sign Up</a>
              <a href="login.html" className="btn btn-light">Login</a>
            </div>
          </div>
        </div>
      </section>
    )
}

Landing.propTypes = {

}

export default Landing
