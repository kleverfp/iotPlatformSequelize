import axios from "axios";
import { setAlert } from "./alert";

import {
    SET_ALARM,GET_ALARM,ALARM_ERROR
} from './types'

export const setAlarm = (formData) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/sensoralert',formData,config);
        
        dispatch({
            type:SET_ALARM,
            payload:res.data
        });
        dispatch(setAlert('alarm created','success'));

    } catch (error) {
        dispatch(setAlert('error: alarm not set','danger'));
    }
}

export const getAlarm = (gatewayid) => async dispatch =>{
   
    try {
        const res = await axios.get(`/api/sensoralert/${gatewayid}`);
        console.log(res.data);
        dispatch({
            type:GET_ALARM,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type:ALARM_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}