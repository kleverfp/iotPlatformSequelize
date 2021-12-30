import axios from "axios";
import { setAlert } from "./alert";
import {
    SET_SENSIBILITY,
    GET_SENSIBILITY,
    SENSIBILITY_ERROR

} from './types'

export const setSensibility = (formData) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/sensibility/gateway/${formData.gatewayid}/sensor/${formData.sensorid}`,formData,config);
        console.log(res);
        dispatch({
            type:SET_SENSIBILITY,
            payload:res.data
        });
        dispatch(setAlert('sensibility updated','success'));
    }
    catch(error){
        dispatch({
            type:SENSIBILITY_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });
    }

}

export const getSensibility = (gateway)=>async dispatch=>{
    try {
        const res = await axios.get(`/api/sensibility/getall/gateway/${gateway}`);
        console.log(res.data);
        dispatch({
            type:GET_SENSIBILITY,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:SENSIBILITY_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });
    }
}