const express = require('express');
const auth = require('../middleware/auth');
const 
const router = express.Router();



router.post('/gateway/:gatewayid/sensor/:sensorid',auth,(req,res)=>{
    
});

router.get('/gateway/:gatewayid/sensor/:sensorid',auth,(req,res)=>{

});



module.exports = router;