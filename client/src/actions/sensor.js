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

