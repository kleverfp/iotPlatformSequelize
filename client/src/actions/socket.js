import io from 'socket.io-client';


export const socketConnection = (gatewayid)=>{
    console.log("caall")
    const socket = io("http://localhost:5005");
    socket.auth={token:localStorage.token};
    socket.on('connect',()=>{
        console.log("connect");
    });

    socket.on('sensor',(data)=>{
        console.log(data);
    })
}