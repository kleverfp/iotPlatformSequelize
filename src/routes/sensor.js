const express = require('express');
const {body,validationResult} = require('express-validator');
const router = express.Router();
const Sensor = require('../models/Sensor');
const Gateway = require('../models/Gateway');
const auth = require('../middleware/auth');
const connectionDB = require('../database');

router.post('/new/:gatewayId',auth,[
    body('name','Sensor name is required').trim().not().isEmpty(),
    body('sensorid','sensorid  is required').trim().not().isEmpty(),
    body('type','sensor type is required').trim().not().isEmpty(),
],async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(400).json({errors:[{msg:errors.array()}]});
    
    const {name,sensorid,type,communication,lon,lat,country,province,city,neighborhood,street,zipCode} = req.body; 
    try {
        
        const sensorBySensorId = await Sensor.findOne({where:{sensorid}});
        if(sensorBySensorId)
            return res.status(500).json({errors:[{msg:'sensorid already exists'}]});

        const gateway = await Gateway.findOne({where:{gatewayid:req.params.gatewayId}}) ;

        let sensor = await Sensor.findAll({where:{gateway_id:gateway.id}});

        const msgError =[];
        const sensorName = sensor.map((sensorItem)=>sensorItem.name).indexOf(name);
       
        if(sensorName >= 0)
            msgError.push({error:'name already existis'});
        
        const sensorExistId = sensor.map((sensorItem)=>sensorItem.gateway_id).indexOf(sensorid);

        if(sensorExistId  >= 0)
            msgError.push({error:'sensorId already existis'});

        if(msgError.length > 0)
            return res.status(400).json({msg:msgError});
        
            const sensorFields ={};
            
            sensorFields.gateway_id =gateway.id;
            sensorFields.name = name;
            sensorFields.sensorid = sensorid;
            sensorFields.type = type;
            sensorFields.communication = communication;
            sensorFields.gps ={};
            if(lon)sensorFields.lon = lon;
            if(lat)sensorFields.lat =lat;
            sensorFields.location={};
            if(country)sensorFields.country =country;
            if(province)sensorFields.province =province;
            if(city)sensorFields.city =city;
            if(neighborhood)sensorFields.neighborhood =neighborhood;
            if(street)sensorFields.street = street;
            if(zipCode)sensorFields.zipcode = zipCode;
    
            sensor = new Sensor(sensorFields);
    
            await sensor.save();
    
            res.json(sensor);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'server error'}]});        
    }

});

router.get('/:sensorId',auth,async(req,res)=>{
    try {
        let sensor = await Sensor.findOne({where:{sensorid:req.params.sensorId}});

        if(!sensor)
            return res.status(400).json({msg:'sensor not found'});
        
        res.json(sensor);

    } catch (error) {
        
    }
});

router.get('/gateway/:gatewayid',async (req,res)=>{
    try {
        
        const [results,metadata] = await connectionDB.query(`select sensorid,name,sdmres.status,sdmres.data,sdmres.created_at,sdLastOn.lastTimeOn from sensors left join(select sd.sensor_id,sd.created_at,sd.status,sd.data from sensordata sd inner join (select sensor_id,max(created_at) as MaxDate from sensordata group by sensor_id) sdm on sd.sensor_id = sdm.sensor_id and sd.created_at = sdm.MaxDate)sdmres on sensors.id=sdmres.sensor_id inner join (select sensor_id,max(created_at) as lastTimeOn from sensordata where status='on' group by sensor_id)sdLastOn on sdLastOn.sensor_id=sdmres.sensor_id where gateway_id in(select id from gateways where gatewayid="${req.params.gatewayid}");`);
        if(!results)
            return res.status(400).json({msg:'no sensors'});

        res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'server error'});
    }
});

router.delete('/:gatewayid/:sensorId',auth,async (req,res)=>{
    try {
       

        const gateway = await Gateway.findOne({where:{gatewayid:req.params.gatewayid}});
        if(!gateway){
                return res.status(400).json({errors:[{msg:'gateway not found'}]});
        }

        const sensorRemoved = await Sensor.destroy({where:{sensorid:req.params.sensorId}});
        if(!sensorRemoved)
            return res.status(400).json({errors:[{msg:'sensor not found'}]});
    
        const sensor = await Sensor.findAll({ 
            where:{gateway_id:gateway.id},
            attributes:['sensorid','name','sensorId','type','communication','lon','lat','country','province','city','neighborhood','street','zipCode']});
            
        if(!sensor)
            return res.status(400).json({msg:'no sensors'});
    
           
            
        res.json(sensor);
        
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'server error'});
    }
});


module.exports = router;