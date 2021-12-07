const express = require('express');
const auth = require('../middleware/auth');
const {body,validationResult} = require('express-validator');
const sensor_alerts = require('../models/SensorAlert');
const Gateway = require('../models/Gateway');
const router = express.Router();



router.post('/',[
    body('period','no period set').trim().not().isEmpty(),
    body('gatewayid','no gateway set').trim().not().isEmpty()
],auth,async(req,res)=>{
   

    const errors= validationResult(req);
    
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors});
    }

    const {period,gatewayid}= req.body;
    try {
       
        const gateway =await Gateway.findOne({where:{gatewayid}});
      
        if(!gateway)
            return res.status(400).json({errors:[{msg:'no gateway found'}]});

        const alert = await sensor_alerts.findOne({where:{gateway_id:gateway.id}})
       
        const sensorAlertFields ={};
        sensorAlertFields.period=period;
        if(alert){
            await sensor_alerts.update({period},{where:{gateway_id:gateway.id}});
            return res.json(sensorAlertFields);
        }
        
        else{
          
            let sensorAlert = new sensor_alerts(sensorAlertFields);
            await sensorAlert.save();
            return res.json(sensorAlert);
        }


    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors:[{msg:'server error'}]});
    }
});

router.get('/:gatewayid',auth,async(req,res)=>{
    try {
        const gateway = await Gateway.findOne({where:{gatewayid:req.params.gatewayid}});
        console.log(gateway);

        if(!gateway)
            return res.status(400).json({errors:[{msg:'no gateway found'}]});

        const alarm = await sensor_alerts.findOne({where:{gateway_id:gateway.id}});
        if(!alarm)
            return res.json([]);
        const {period} = alarm;
        return res.json({period});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors:[{msg:'server error'}]});
    }
});



module.exports = router;