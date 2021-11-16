import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,Navigate } from 'react-router-dom';
import { getSensors } from '../../actions/sensor';
import Spinner from '../layout/Spinner';
import { useLocation } from 'react-router-dom';

const Sensor = ({sensor:{sensor}}) => {
    let location = useLocation();

    useEffect(()=>{
       
        console.log(location);
        //getSensors(gatewayid);
    },[]);
   
       
       
    return (
        <section className="container">{
            (sensor ===null || sensor.length ==0)  ? (<Spinner/>):(
            <Fragment>
               
                <h2 className="my-2">Sensors</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='hide-sm'>name</th>
                        </tr>
                    </thead>
                    <tbody>{sensor.map(snr =>(
                        <tr key={snr.sensorid}>
                            <td>{snr.sensorid}</td>
                            <td className="hide-sm">{snr.name}</td>
                
                            <td>
                            <button  className="btn btn-danger">Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
                <Link to='/create-sensor' className="btn btn-primary my-1">Create sensor</Link>
            </Fragment>)}
        </section>
    )
}

Sensor.propTypes = {
    sensor:PropTypes.object.isRequired,
    getSensors:PropTypes.func.isRequired

}

const mapStateToProps = state =>({
    sensor:state.sensor
})


export default connect(mapStateToProps,{getSensors}) (Sensor)