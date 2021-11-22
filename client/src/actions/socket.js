import { setAlert } from "./alert";
import io from 'socket.io-client';

import {
    GET_SENSOR
} from './types'




export const socketConnection = (gatewayid)=>dispatch=>{


    const socket = io("http://localhost:5005",{
        auth:{
            token:localStorage.token
        },
        query:{
            "gateway":gatewayid
        }
    });
   
    socket.on('connect',()=>{
        console.log("connect");
    });

    socket.on("client",(data)=>{
        dispatch({
            type:GET_SENSOR,
            payload:data
        })
    })
}