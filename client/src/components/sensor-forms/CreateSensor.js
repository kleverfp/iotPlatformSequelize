import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateSensor = ({gateway}) => {

   
    return (
        <section className="container">
            <h1 class="large text-primary">Add Your Sensor</h1>
            <p class="lead">
                <i class="fas fa-user"></i> Let's get some information about your sensor</p>
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
        </section>
        
    )
}
CreateSensor.propTypes = {
    gateway:PropTypes.object.isRequired,
}

export default  CreateSensor;
