import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_GATEWAY,
    GATEWAY_ERROR
}from './types';


export const getGateways = ()=> async dispatch =>{
    try {
        const res = await axios.get('api/gateway/user/all');

        dispatch({
            type:GET_GATEWAY,
            payload : res.data
        })
    } catch (error) {

        dispatch({
            type:GATEWAY_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
        
    }
}