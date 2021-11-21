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


io.use(async(socket, next) => {
  const gatewayid = socket.handshake.auth.gatewayid;
  console.log("gtw:",gatewayid);
  try {
    if(!gatewayid){
     
      auth(socket.handshake.auth.token,socket,next);
      if(socket.user){
        const index = socketUserId.findIndex((obj)=>obj.user=socket.user);

        if(index > -1)
          socketUserId[index].socket = socket.id;
        else
          socketUserId.push({"user":socket.user,"socket":socket.id});

          next();
        
      }
    }
    
    else{
      
      const gateway = await FindGateway(gatewayid);
      console.log("findgat",gateway);
  

      if (!gateway) 
        return next(new Error("invalid gatewayid"));
      
      const index = socketGatewayId.findIndex((obj)=>obj.gateway=gateway.id);

      if(index > -1)
        socketGatewayId[index].socket = socket.id;
      else
      socketGatewayId.push({"gateway":gateway.id,"socket":socket.id});
    
      next();
    }
    
  } catch (error) {
    console.error(error.message);
  }
 
});

io.on('connect', function(socket){
  
      socket.on("clientMsg", async({ content, to }) => {
        try {
          await socketmsg(content);
          const data =  await GetSensorData(socketGatewayId[0].gateway);

          socket.to(socketUserId[0].socket).emit("client",data);

        } catch (error) {
          console.error(error.message);
        }
     
    });


});




const PORT = 5005;
 
http.listen(PORT,()=>{
  console.log(`Server listen on port ${PORT} `);
});
