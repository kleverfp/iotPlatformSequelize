import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_SENSOR,
    SENSOR_ERROR
} from './types'

export const getSensors = (gatewayid)=> async dispatch =>{

    try {
        const res = await axios.get(`/api/sensor/gateway/${gatewayid}`);
       console.log(res.data);
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
        console.log(error);
        dispatch({
            type:SENSOR_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });
    }
}

