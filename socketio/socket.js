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
const socketGatewayId =[];
const socketUserId =[];


io.use(async(socket, next) => {
  const gatewayid = socket.handshake.auth.gatewayid;

  try {
    if(!gatewayid){
      auth(socket.handshake.auth.token,socket,next);
      if(socket.user){
        const index = socketUserId.findIndex((obj)=>obj.user=socket.user);

        if(index > -1)
          socketUserId[index].socket = socket.id;
        else
          socketUserId.push({"user":socket.user,"socket":socket.id});

          console.log("handshke:",socketUserId);
          next();
        
      }
    }
    
    else{
      const gateway = await FindGateway(gatewayid);
  

      if (!gateway) {
        return next(new Error("invalid gatewayid"));
      }
  
      socket.gatewayid = gatewayid;
      next();
    }
    
  } catch (error) {
    console.error(error.message);
  }
 
});

io.on('connect', function(socket){
    console.log(socket.data);
    socket.emit("messageClient", "hello world");

   /* socket.on("clientMsg", data => {
       socketmsg(data);
    });*/

    socket.on("clientMsg", ({ content, to }) => {
      console.log("content:",content);
      //userid =socket.id;
     socketmsg(content);
    });

 /*   setInterval(()=>{
      console.log("snd",socket.id);
      socket.to(userid).emit("private",{
        content:"ok",
        from:socket.id
      })
  },10000)*/
});




const PORT = 5005;
 
http.listen(PORT,()=>{
  console.log(`Server listen on port ${PORT} `);
});
