import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,useParams,useNavigate } from 'react-router-dom';
import { getSensors,deleteSensor } from '../../actions/sensor';
import { socketConnection } from '../../actions/socket';
import Spinner from '../layout/Spinner';


const Sensor = ({getSensors,deleteSensor,sensor:{sensor}}) => {
    const navigate = useNavigate();
    const {gatewayid} = useParams();
    
    useEffect(()=>{
        getSensors(gatewayid);
        socketConnection(gatewayid);
        
    },[]);
   
    const createSensorHandler = (e)=>{
        navigate(`/create-sensor/${gatewayid}`);
    }    
    const dashboardHandler = (e)=>{
        navigate('/dashboard');
        
    } 
      
    const deleteHandler= async (sensorid) =>{
            deleteSensor(sensorid,gatewayid);
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
                                    <th className='hide-sm'>status</th>
                                    <th className='hide-sm'>last update</th>
                                </tr>
                            </thead>
                            <tbody>{sensor.map(snr =>(
                                <tr key={snr.sensorid}>
                                    <td>{snr.sensorid}</td>
                                    <td className="hide-sm">{snr.name}</td>
                                    <td className="hide-sm">{snr.status}</td>
                                    <td className="hide-sm">{snr.created_at}</td>
                                    <td>
                                    <button onClick={ () =>deleteHandler(snr.sensorid)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                        <button onClick={createSensorHandler} className="btn btn-primary my-1">Create sensor</button>
                        <button className="btn btn-light my-1" onClick={dashboardHandler}>Go Back</button>
                   </Fragment>):(<Fragment>
                    <p>No sensor registered.</p>
                    <button   onClick={createSensorHandler} className="btn btn-primary my-1">Create sensor</button>
                    <button className="btn btn-light my-1" onClick={dashboardHandler}>Go Back</button>
                   </Fragment>)
               }
               
            </Fragment>)}
        </section>
    )
}

Sensor.propTypes = {
    sensor:PropTypes.object.isRequired,
    getSensors:PropTypes.func.isRequired,
    deleteSensor:PropTypes.func.isRequired

}

const mapStateToProps = state =>({
    sensor:state.sensor
})


export default connect(mapStateToProps,{getSensors,deleteSensor}) (Sensor)