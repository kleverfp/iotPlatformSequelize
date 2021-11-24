const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (token,socket,next)=>{
  
    if(!token)
        return next(new Error("invalid gatewayid"));
    
    try{
        const decode = jwt.verify(token,config.get('jwtSecret'));
        socket.user =decode.user.id;
        next();
    }catch(err){
        console.error(err.message);
    }
}

