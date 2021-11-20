import io from 'socket.io-client';
import {
    UPDATE_SENSOR
} from './types';

export const socketConnection = (gatewayid)=>{

    const socket = io("http://localhost:5005");
    socket.auth={token:localStorage.token};

    socket.on('connect',()=>{
        console.log("connect");
    });

    socket.on("client",(data)=>{
        console.log(data);
    })
}