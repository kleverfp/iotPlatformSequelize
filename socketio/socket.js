const express = require('express');
const socketmsg = require('../src/routes/socket');
const app = express();
const http = require('http').Server(app);
const auth = require('../src/middleware/socketAuth');
const io = require('socket.io')(http,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const FindGateway = require('../src/controllers/Gateway');
const GetSensorData = require('../src/controllers/SensorData');
const socketGatewayId =[];
const socketUserId =[];
let socketActuatorId='';


io.use(async(socket, next) => {
  const gatewayid = socket.handshake.auth.gatewayid;
  const actuator  = socket.handshake.auth.actuatorid;
  
  try {
   
    if(actuator){
      socketActuatorId = socket.id;
      next();
    }
    else if(gatewayid){
     
      const gateway = await FindGateway(gatewayid);
     
      if (!gateway) 
        return next(new Error("invalid gatewayid"));
      
      const index = socketGatewayId.findIndex((obj)=>obj.gateway==gateway.id);

      if(index > -1)
        socketGatewayId[index].socket = socket.id;
      else
        socketGatewayId.push({"gateway":gateway.id,"gatewayid":gateway.gatewayid,"socket":socket.id});
    
      next();
    }
    else{

      auth(socket.handshake.auth.token,socket,next);
     
      if(socket.user){
        const index = socketUserId.findIndex((obj)=>obj.user==socket.user);
       
        if(index > -1){
 
          socketUserId[index].socket = socket.id;
          socketUserId[index].gatewayid = socket.handshake.query.gateway;
        }
        else
          socketUserId.push({"user":socket.user,"socket":socket.id,"gatewayid":socket.handshake.query.gateway});
        
        next();
        
      }
    }
    
  } catch (error) {
    console.error(error.message);
  }
 
});

io.on('connect', function(socket){
  
    socket.on("gatewayMsg", async({ content, to }) => {
        try {
          socket.to(socketUserId).emit('actuatorMsg',content);
          const indexGateway = socketGatewayId.findIndex((gtw)=>gtw.gatewayid == content.gatewayid);
          
          if(indexGateway> -1){
            await socketmsg(content);
            const indexUser = socketUserId.findIndex((usr)=> usr.gatewayid == socketGatewayId[indexGateway].gatewayid);
            
            if(indexUser > -1){
              const data =  await GetSensorData(socketGatewayId[indexGateway].gatewayid);
              socket.to(socketUserId[indexUser].socket).emit("client",data);
              
            }
          }


        } catch (error) {
          console.error(error.message);
        }
     
    });

    socket.on("server", ({content})=>{
     
      const index = socketGatewayId.findIndex((obj)=>obj.gatewayid==content.gatewayid);
      if(index > -1)
        socket.to(socketGatewayId[index].socket).emit("RecieveFromServer",content);
      
      
    });


});




const PORT = 5005;
 
http.listen(PORT,()=>{
  console.log(`Server listen on port ${PORT} `);
});
