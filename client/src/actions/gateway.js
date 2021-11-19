import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_GATEWAY,
    UPDATE_GATEWAY,
    GATEWAY_ERROR,
    CLEAR_SENSOR
}from './types';


export const getGateways = ()=> async dispatch =>{
    try {
        const res = await axios.get('api/gateway/user/all');

        dispatch({
            type:GET_GATEWAY,
            payload : res.data
        });
        dispatch({
            type:CLEAR_SENSOR
        })

        
    } catch (error) {

        dispatch({
            type:GATEWAY_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });
        
    }
}


export const createGateway = (formData,navigate,edit=false)=> async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('api/gateway/new',formData,config);
        
        dispatch({
            type:GET_GATEWAY,
            payload : res.data
        });

        dispatch(
            setAlert(edit ? 'Gateway Updated' : 'Gateway Created', 'success')
          );
    
          if (!edit) {
            navigate('/dashboard');
          }
    } catch (error) {

        dispatch({
            type:GATEWAY_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        });

        
        
    }
}

export const deleteGateway = (gatewayid)=> async(dispatch) =>{

    try {
        const res = await axios.delete(`/api/gateway/${gatewayid}`);

        dispatch({
            type:UPDATE_GATEWAY,
            payload : res.data
        });

        dispatch(setAlert('gateway removed','success'))

    } catch (error) {
        dispatch({
            type:GATEWAY_ERROR,
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