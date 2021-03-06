import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {useParams,useNavigate } from 'react-router-dom';
import { getSensors,deleteSensor } from '../../actions/sensor';
import { getAlarm, setAlarm } from '../../actions/sensorAlarm';
import {getSensibility,setSensibility} from '../../actions/sensorSensibility';

import { socketConnection,sendMessageToServer } from '../../actions/socket';
import Spinner from '../layout/Spinner';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Sensor = ({getSensibility,setSensibility,getSensors,getAlarm,setAlarm,sendMessageToServer,socketConnection,deleteSensor,sensor:{sensor},sensorAlarm:{alarm},sensorSensibility:{sensibility}}) => {
    const navigate = useNavigate();
    const {gatewayid} = useParams();
    const [show,setShow] = useState([]);
    const [showAlarm,setShowAlarm] = useState(false);
    const [elapsed,setElapsed]= useState([]);
    const [alarmTime,setAlarmTime] = useState(null);
    const [sensorSensibilityState,setSensorSensibilityState] = useState([]);
    const [formData,setFormData]  = useState({
        period:'',
        gatewayid
    });

    const options = ["1", "2", "3","4","5"];
    const defaultOption = options[0];

    useEffect(()=>{
        getSensors(gatewayid);
        socketConnection(gatewayid);
        getAlarm(gatewayid);
        getSensibility(gatewayid);
        
    },[]);

    useEffect(()=>{
        alarm && setAlarmTime(alarm.period);
    },[alarm]);

    useEffect(()=>{
        const interval=  setInterval(()=>{
           
            if(sensor !== null && sensor.length > 0) 
                updateElapsedTime();
        
         },1000);
         return ()=>clearInterval(interval);
    },[sensor,alarm]);

    useEffect(()=>{
        sensibility && setSensorSensibilityState(sensibility);
        console.log(sensibility);
    },[sensibility])

    const updateElapsedTime =()=>{
          
            let hour=0;
            let min=0;
            let sec=0;
            let minutes =0;
            const result = sensor.map((snr)=>{
                
                if(snr.status !=='on' ){
                    hour=0;min=0; sec=0;
                }
                else{
                     const time = Math.abs(Date.now()  - new Date(snr.lastTimeOn));
                     const timesec = time/1000;
                     minutes = Math.floor(time/(1000*60));
                     
                     hour  = Math.floor(minutes/60);
                     min = minutes - hour*60;
                     sec = Math.floor(timesec - hour*60*60 - min*60);
                }
               
                if(hour < 10)
                    hour = `0${hour}`;
                if(min < 10)
                    min = `0${min}`;
                if(sec < 10)
                    sec = `0${sec}`;

                    let layout ='';
                    const time = `${hour}:${min}:${sec}`;
                    
                    if(alarm !== null){
                       
                        const hours = Math.floor(alarm.period/60);
                        const minutes = alarm.period - 60*hours;
                        const alarmTime = `${hours}:${minutes}:00`;
                        const second = time.slice(time.lastIndexOf(':')+1);
                        if(Date.parse('01/01/2021 ' + time) > Date.parse( '01/01/2021 '+ alarmTime) && (second %2 ==0))
                            layout =  'td-background';
                    }
                
                return {time:`${hour}:${min}:${sec}`, layout};
            
        });
        setElapsed(result);
    }

    const showControlsHandler = (id)=>{

        const index = show.findIndex((sw)=>sw.id==id);
    
        if(index > -1)
            setShow(show.filter((ob)=>ob.id !== id));
        else
            setShow([...show,{id}]);
    }
        
    const resetSensorHandler = (id)=>{
        
        sendMessageToServer(id,gatewayid,"reset","");
    }

    const createSensorHandler = (e)=>{
        navigate(`/create-sensor/${gatewayid}`);
    }   

    const dashboardHandler = (e)=>{
        navigate('/dashboard');
        
    } 
   
    const deleteHandler= async (sensorid) =>{
        deleteSensor(sensorid,gatewayid);
    }

    const setAlaramHandler = (e)=>{
        setShowAlarm(!showAlarm);
    }

    const alarmHandler =(e)=>{
        if(e.target.value < 0)
            e.target.value =0;

       setFormData({...formData,period:e.target.value});
    }

    const saveAlarm = (e)=>{
        e.preventDefault();
        setAlarm(formData);
    }

    const statusNameHandler= (status)=>{
        if(status=="on")
            return "ocupado"
        else if(status =='off')
            return "disponivel"
        else
            return 'unknown'
    }
   
    const sensibilityHandler = (sensibilityValue,sensorid)=>{
        const sensibilityData ={
            data:sensibilityValue,
            gatewayid,
            sensorid
        }
        setSensibility(sensibilityData);
        sendMessageToServer(sensorid,gatewayid,"setSensibility",sensibilityValue);
    }

    const dropDownDefaultSensibilityHandler = (sensorId)=>{
            if(sensorSensibilityState !== null && sensorSensibilityState.length > 1){
                const arraySensorSensibilityIndex = sensorSensibilityState.findIndex((sensibility)=>sensibility.sensorid ==sensorId);
                if(arraySensorSensibilityIndex > -1)
                    return sensorSensibilityState[arraySensorSensibilityIndex].data === null ? "3":sensorSensibilityState[arraySensorSensibilityIndex].data;
            
            }
        
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
                            <tbody>{sensor.map((snr,index) =>(
                               
                                <Fragment key={`frg-01${snr.sensorid}`}>
                                <tr  key={snr.sensorid}>
                                    <td className={elapsed[index] && elapsed[index].layout}>{snr.sensorid}</td>
                                    <td className={`hide-sm msg-${snr.status} ${elapsed[index] && elapsed[index].layout}`}>{snr.name}</td>
                                    <td className={`hide-sm msg-${snr.status} ${elapsed[index] && elapsed[index].layout}` }>{statusNameHandler(snr.status)}</td>
                                    <td className={`hide-sm msg-${snr.status} ${elapsed[index] && elapsed[index].layout}`}>{snr.created_at}</td>
                                    <td className={`hide-sm msg-${snr.status} ${elapsed[index] && elapsed[index].layout}`}>{elapsed[index] && elapsed[index].time}</td>
                                    <td>
                                        <button onClick={ () =>showControlsHandler(snr.sensorid)} className="btn btn-success">Commands</button>
                                    </td>
                                    <td>
                                        <button onClick={ () =>deleteHandler(snr.sensorid)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                {(show.findIndex((obj)=>obj.id==snr.sensorid) > -1) && 
                                    
                                    <tr>
                                        <td></td>
                                        <td><label>sensibility:</label></td>
                                        <td>
                                        <Dropdown options={options} onChange={(e)=> sensibilityHandler(e.value,snr.sensorid)} value={dropDownDefaultSensibilityHandler(snr.sensorid)}/>
                                        </td>
                                        <td><button onClick={ () =>resetSensorHandler(snr.sensorid)} className="btn btn-success">reset sensor</button></td>
                                    </tr>
                                    } 
                                </Fragment>
                                
                        
                            ))}
                            </tbody>
                        </table>
                        <br/>
                        <button onClick={createSensorHandler} className="btn btn-primary my-1">Create sensor</button>
                        <button className="btn btn-primary my-1" onClick={setAlaramHandler}>Alarm</button>
                        <button className="btn btn-light my-1" onClick={dashboardHandler}>Go Back</button>
                        <br/><br/><br/><br/>
                        {showAlarm && 
                            <form className="form">
                                <div className="form-group">
                                    <input  placeholder="time in minutes" type="number" className="input-alarm" name="time" onChange={alarmHandler} />
                                    <button className="btn btn-success m-1" onClick={saveAlarm}>save</button>
                                </div>
                            </form>}
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
    sensorAlarm:PropTypes.object.isRequired,
    sensorSensibility:PropTypes.object.isRequired,
    getSensors:PropTypes.func.isRequired,
    socketConnection:PropTypes.func.isRequired,
    deleteSensor:PropTypes.func.isRequired,
    sendMessageToServer:PropTypes.func.isRequired,
    getAlarm:PropTypes.func.isRequired,
    setAlarm:PropTypes.func.isRequired,
    getSensibility:PropTypes.func.isRequired,
    setSensibility:PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
    sensor:state.sensor,
    sensorAlarm:state.sensorAlarm,
    sensorSensibility:state.sensorSensibility
})


export default connect(mapStateToProps,{setSensibility,getSensibility,getSensors,setAlarm,getAlarm,deleteSensor,socketConnection,sendMessageToServer}) (Sensor)