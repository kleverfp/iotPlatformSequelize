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
  
  try {
    if(!gatewayid){

      auth(socket.handshake.auth.token,socket,next);
      console.log("ok");
      if(socket.user){
        const index = socketUserId.findIndex((obj)=>obj.user==socket.user);
        console.log("index",index);
        if(index > -1){
          console.log("ok2");
          console.log("gtwNew:",socket.handshake.query.gateway);
          socketUserId[index].socket = socket.id;
          socketUserId[index].gatewayid = socket.handshake.query.gateway;
        }
        else{
          console.log("ok3");
          console.log(socket.handshake.query);
          socketUserId.push({"user":socket.user,"socket":socket.id,"gatewayid":socket.handshake.query.gateway});
        }
        next();
        
      }
    }
    
    else{
      console.log("gtwid:",gatewayid);
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
    
  } catch (error) {
    console.error(error.message);
  }
 
});

io.on('connect', function(socket){
  
      socket.on("gatewayMsg", async({ content, to }) => {
        try {
          
          const indexGateway = socketGatewayId.findIndex((gtw)=>gtw.gatewayid == content.gatewayid);
          console.log("socketUsr:",socketUserId);
          console.log("indexGtw",indexGateway);
          if(indexGateway> -1){
            await socketmsg(content);
            const indexUser = socketUserId.findIndex((usr)=> usr.gatewayid == socketGatewayId[indexGateway].gatewayid);
            console.log("indexUsr",indexUser);
            if(indexUser > -1){
              const data =  await GetSensorData(socketGatewayId[indexGateway].gatewayid);
              socket.to(socketUserId[indexUser].socket).emit("client",data);
            }
          }
         
         

        } catch (error) {
          console.error(error.message);
        }
     
    });

    socket.on("clientMsg", async(data)=>{
      try {
        
      } catch (error) {
        console.error(error.message);
      }
    })


});




const PORT = 5005;
 
http.listen(PORT,()=>{
  console.log(`Server listen on port ${PORT} `);
});
