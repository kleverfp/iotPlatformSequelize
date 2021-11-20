import io from 'socket.io-client';


export const socketConnection = (gatewayid)=>{
    const socket = io("http://localhost:5005");
    socket.auth={gatewayid};
    socket.on('connect',()=>{
        console.log("connect");
    });

    socket.on('sensor',(data)=>{
        console.log(data);
    })
}