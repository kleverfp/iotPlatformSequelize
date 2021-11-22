import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_SENSOR,
    SENSOR_ERROR,
    UPDATE_SENSOR
} from './types'




export const getSensors = (gatewayid)=> async dispatch =>{

    try {
        
        const res = await axios.get(`/api/sensor/gateway/${gatewayid}`);
        dispatch({
            type:GET_SENSOR,
            payload:res.data
        });


    } catch (err) {
        dispatch({
            type:SENSOR_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const createSensor = (gatewayid,formData,navigate) => async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post(`/api/sensor/new/${gatewayid}`,formData,config);
        
        dispatch({
            type:GET_SENSOR,
            payload:res.data
        });
        dispatch(setAlert('sensor created','success'));

        navigate(`/sensor/${gatewayid}`);
        
    } catch (error) {
       
        dispatch({
            type:SENSOR_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });
    }
}


export const deleteSensor = (sensorid,gatewayid) => async(dispatch) =>{

    try {
        const res = await axios.delete(`/api/sensor/${gatewayid}/${sensorid}`);

        dispatch(setAlert('sensor removed','success'));

        dispatch({
            type:UPDATE_SENSOR,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type:SENSOR_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });

        const errors = error.response.data.errors;
       
        if(errors){
            errors.forEach(error=>{
                dispatch(setAlert(error.msg,'danger'))
            });
        }   
    }

}

