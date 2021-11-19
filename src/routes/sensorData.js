const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const connectionDB = require('../database');

router.get('/gateway/:gatewayid',auth,async(req,res) =>{
    try {
        

        const [results, metadata] = await connectionDB.query(`select data.status,data.data, sensors.sensorid from sensordata as data inner join sensors on data.sensor_id = sensors.id where sensors.gateway_id in (select id from gateways where gatewayid="${req.params.gatewayid}");`);
        res.json({results});
        
    } catch (error) {
        
    }
});

router.get('/:sensorid',auth,async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
    
})

module.exports=router;