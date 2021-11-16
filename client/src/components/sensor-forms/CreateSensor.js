import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const CreateSensor = props => {
    return (
        <Fragment>
            <h1 class="large text-primary">Create Your Profile</h1>
            <p class="lead">
                <i class="fas fa-user"></i> Let's get some information to make your
                profile stand out</p>
            <small>* = required field</small>
            <form class="form">
                <div class="form-group">
                    <input type="text" placeholder="name" name="name" />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="sensor id" name="sensorid" />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="type" name="type" />
                </div>
              
        
                <div class="form-group">
                  <input type="text" placeholder="latitude" name="lat"/>
                </div>

                <div class="form-group">
                  <input type="text" placeholder="longitude" name="lon"/>
                </div>

              
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
              </form>
        </Fragment>
        
    )
}
CreateSensor.propTypes = {

}

export default CreateSensor;
