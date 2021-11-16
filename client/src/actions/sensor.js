import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_SENSOR,
    SENSOR_ERROR
} from './types'

export const getSensors = (gateway)=> async dispatch =>{
    console.log(gateway);
   /* try {
        const res = await axios.get(`api/sensor/gateway/${gateway}`);
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
    }*/
}

