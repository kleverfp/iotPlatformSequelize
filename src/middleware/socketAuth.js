const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (token,socket,next)=>{
    console.log(token);
    if(!token)
        return next(new Error("invalid gatewayid"));
    
    try{
        const decode = jwt.verify(token,config.get('jwtSecret'));
        socket.user =decode.user.id;
        console.log("socket:",socket.user);
        next();
    }catch(err){
        console.error(err.message);
        res.status(401).json({msg:'inavlid token'});
    }
}

