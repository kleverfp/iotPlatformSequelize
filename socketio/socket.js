const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connect', function(socket){
    console.log(socket.data);
    socket.emit("messageClient", "hello world");

    socket.on('message', data => {
        console.log(data);
      });
});

const PORT = 5005;
 
http.listen(PORT,()=>{
  console.log(`Server listen on port ${PORT} `);
});
