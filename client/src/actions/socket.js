import { setAlert } from "./alert";
import io from 'socket.io-client';

import {
    GET_SENSOR
} from './types'

let socket=[];


export const socketConnection = (gatewayid)=>dispatch=>{


    /*socket = io("https://qonteciot.com/socket",{
        auth:{
            token:localStorage.token
        },
        query:{
            "gateway":gatewayid
        },
	    transports: ['websocket'], wsEngine: 'uws'
    });*/

    socket = io("https://qonteciot.com/socket",{
        auth:{
            token:localStorage.token
        },
        query:{
            "gateway":gatewayid
        },
	    transports: ['websocket'], wsEngine: 'uws'
    });

   
    socket.on('connect',()=>{
        console.log("connect")
        console.log(socket.id);
    });

    socket.on("client",(data)=>{
        dispatch({
            type:GET_SENSOR,
            payload:data
        })
    })
}

export const sendMessageToServer = (sensorid,gatewayid,command,data)=>dispatch=>{
    
    socket.emit("server",{'content':{
        "sensorid":sensorid,
        "gatewayid":gatewayid,
        "cmd":command,
        "data":data
        }
    });
    dispatch(setAlert('message send to server','success'));
}
