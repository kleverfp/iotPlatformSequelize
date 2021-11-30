import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link,useParams,useNavigate } from 'react-router-dom';
import { getSensors,deleteSensor } from '../../actions/sensor';
import { socketConnection,sendMessageToServer } from '../../actions/socket';
import Spinner from '../layout/Spinner';


const Sensor = ({getSensors,sendMessageToServer,socketConnection,deleteSensor,sensor:{sensor}}) => {
    const navigate = useNavigate();
    const {gatewayid} = useParams();
    let showStatus = false;
    useEffect(()=>{
        getSensors(gatewayid);
        socketConnection(gatewayid);
        
    },[]);

    const [show,setShow] = useState([]);
    const showControlsHandler = (id)=>{

        const index = show.findIndex((sw)=>sw.id==id);
    
        if(index > -1)
            setShow(show.filter((ob)=>ob.id !== id));
        else
            setShow([...show,{id}]);
    }
        
    const resetSensorHandler = (id)=>{
        sendMessageToServer(id,gatewayid,"reset");
    }
    const createSensorHandler = (e)=>{
        navigate(`/create-sensor/${gatewayid}`);
    }    
    const dashboardHandler = (e)=>{
        navigate('/dashboard');
        
    } 

    const serverMessageHandler = (sensorid)=>{
       sendMessageToServer(sensorid,gatewayid);
       
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
                                <Fragment key={`frg-01${snr.sensorid}`}>
                                <tr key={snr.sensorid}>
                                    <td>{snr.sensorid}</td>
                                    <td className={`hide-sm msg-${snr.status}`}>{snr.name}</td>
                                    <td className={`hide-sm msg-${snr.status}`}>{snr.status=="on"?"ocupado":"disponivel"}</td>
                                    <td className={`hide-sm msg-${snr.status}`}>{snr.created_at}</td>
                                    <td>
                                        <button onClick={ () =>showControlsHandler(snr.sensorid)} className="btn btn-success">Commands</button>
                                    </td>
                                    <td>
                                        <button onClick={ () =>deleteHandler(snr.sensorid)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                {(show.findIndex((obj)=>obj.id==snr.sensorid) > -1) && 
                                    
                                    <tr>
                                        <td><input type="text" placeholder="type"></input></td>
                                        <td><input type="text" placeholder="value"></input></td>
                                        <td><button onClick={ () =>showControlsHandler(snr.sensorid)} className="btn btn-success">send</button></td>
                                        <td><button onClick={ () =>resetSensorHandler(snr.sensorid)} className="btn btn-success">reset</button></td>
                                    </tr>
                                    } 
                                </Fragment>
                                
                        
                            ))}
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
    socketConnection:PropTypes.func.isRequired,
    deleteSensor:PropTypes.func.isRequired,
    sendMessageToServer:PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
    sensor:state.sensor
})


export default connect(mapStateToProps,{getSensors,deleteSensor,socketConnection,sendMessageToServer}) (Sensor)