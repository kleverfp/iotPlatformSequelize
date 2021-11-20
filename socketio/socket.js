const express = require('express');
const socketmsg = require('../src/routes/socket');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const FindGateway = require('../src/controllers/Gateway');
let gatewayid ="";
let userid ="";

io.use(async(socket, next) => {
  gatewayid = socket.handshake.auth.gatewayid;
  try {
    const gateway = await FindGateway(gatewayid);
  

    console.log(socket.id);
    if (!gateway) {
      return next(new Error("invalid gatewayid"));
    }
  
    socket.gatewayid = gatewayid;
    next();
    
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
      userid =socket.id;
     socketmsg(content);
    });

    setInterval(()=>{
      console.log("snd",socket.id);
      socket.to(userid).emit("private",{
        content:"ok",
        from:socket.id
      })
  },10000)
});




const PORT = 5005;
 
http.listen(PORT,()=>{
  console.log(`Server listen on port ${PORT} `);
});
