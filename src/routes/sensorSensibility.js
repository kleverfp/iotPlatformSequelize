const express = require('express');
const auth = require('../middleware/auth');
const {body,validationResult} = require('express-validator');
const Sensor = require('../models/Sensor');
const Gateway = require('../models/Gateway');
const sensor_sensibility = require('../models/SensorSensibility');
const connectionDB = require('../database');
const router = express.Router();

router.post('/gateway/:gatewayid/sensor/:sensorid',auth,[
    body('data','data is required').trim().not().isEmpty()
],async(req,res)=>{
    
    try {
        const {data} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors:[{msg:errors.array()}]});

        
        const gateway = await Gateway.findOne({where:{gatewayid:req.params.gatewayid}});
        if(!gateway){
            return res.status(401).json({errors:[{msg:"opration unauthorized"}]});
        }

        const sensor = await Sensor.findOne({where:{sensorid:req.params.sensorid,gateway_id:gateway.id}});
        if(!sensor){
            console.log("sensor error")
            return res.status(400).json({errors:[{msg:"sensor not found"}]});
        }
        const sensibilityFields ={};
        sensibilityFields.sensor_id = sensor.id;
        sensibilityFields.data = data;
           
        const sensorSensibility = sensor_sensibility.findOne({where:{sensor_id:sensor.id}});
        if(!sensorSensibility){
            
            const sensibility  = new sensor_sensibility(sensibilityFields);
            await sensibility.save();
           
            const [results,metadata] = await connectionDB.query(`select sensor_id,data,snr.sensorid from sensor_sensibilities as sensibility right join (select id,sensorid from sensors where gateway_id in(select id from gateways where gatewayid='${req.params.gatewayid}')) snr on sensibility.sensor_id =snr.id ;`);
            res.json(results);
        }
        else{
            await sensor_sensibility.update({data:sensibilityFields.data},{where:{sensor_id:sensor.id}});
            const [results,metadata] = await connectionDB.query(`select sensor_id,data,snr.sensorid from sensor_sensibilities as sensibility right join (select id,sensorid from sensors where gateway_id in(select id from gateways where gatewayid='${req.params.gatewayid}')) snr on sensibility.sensor_id =snr.id ;`);
            res.json(results);
        }


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({errors:[{msg:"server error"}]});
    }

});

router.get('/gateway/:gatewayid/sensor/:sensorid',auth,async(req,res)=>{
    try {
        const sensor = await Sensor.findOne({where:{sensorid:req.params.sensorid}});
        if(!sensor)
            return res.status(400).json({errors:[{msg:"sensor not found"}]});
        
        const gateway = await Gateway.findOne({
            where:{gatewayid:req.params.gatewayid,sensor_id:sensor.id}
           
        });
        if(!gateway)
            return res.status(401).json({errors:[{msg:"opration unauthorized"}]});

        const sensibility = await Sensor_sensibility.findOne({
            where:{sensor_id:sensor.id},
            attributes: {exclude: ['id','sensor_id']}
        });
        sensibility.sensorid = sensor.sensorid;
        res.json(sensibility);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({errors:[{msg:"server error"}]});
    }
});

router.get('/getall/gateway/:gatewayid',auth,async(req,res)=>{
    try {
        const [results,metadata] = await connectionDB.query(`select sensor_id,data,snr.sensorid from sensor_sensibilities as sensibility right join (select id,sensorid from sensors where gateway_id in(select id from gateways where gatewayid='${req.params.gatewayid}')) snr on sensibility.sensor_id =snr.id ;`);
        res.json(results);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({errors:[{msg:"server error"}]});
    }
})


module.exports = router;