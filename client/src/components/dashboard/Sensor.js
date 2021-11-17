import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,useParams,useNavigate } from 'react-router-dom';
import { getSensors } from '../../actions/sensor';
import Spinner from '../layout/Spinner';


const Sensor = ({getSensors,sensor:{sensor}}) => {
    const navigate = useNavigate();

    const {gatewayid} = useParams();
    useEffect(()=>{
        getSensors(gatewayid);
    },[]);
   
    const createSensorHandler = (e)=>{
        navigate(`/create-sensor/${gatewayid}`)
    }    
       
    return (
        <section className="container">{
            (sensor ===null)  ? (<Spinner/>):(
            <Fragment>
                <h2 className="my-2">Sensors</h2>
               {
                   sensor !== null && sensor.length > 0 ?(
                    <Fragment>
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
                        <button onClick={createSensorHandler} className="btn btn-primary my-1">Create sensor</button>
                   </Fragment>):(<Fragment>
                    <p>No sensor registered.</p>
                    <button   onClick={createSensorHandler} className="btn btn-primary my-1">Create sensor</button>
                   </Fragment>)
               }
               
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