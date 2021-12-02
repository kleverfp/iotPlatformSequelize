const express = require('express');
const auth = require('../middleware/auth');
const {body,validationResult} = require('express-validator');
const SensorAlert = require('../models/SensorAlert');
const Gateway = require('../models/Gateway');

const router = express.Router();



router.post('/',[
    body('period','no period set').trim().not().isEmpty(),
    body('gatewayid','no gateway set').trim().not.isEmpty()
],auth,async(req,res)=>{

    const errors= validationResult(req);
    if(errors)
        return res.status(400).json({errors});

    const {period,gatewayid}= req.body();
    try {
        const gateway = Gateway.findOne({where:{gatewayid}});
        if(!gateway)
            return res.status(400).json({errors:[{msg:'no gateway found'}]});
        
        
        const alert = await SensorAlert.findOne({
            where: { gateway_id: gateway.id}
          });

        if(alert)
          await SensorAlert.update({period},{where:{gateway_id:gateway.id}});
        
        
        else
          await SensorAlert.create({period,gateway_id:gateway.id});
          
        return res.status(200).json({msg:'alert created'});


    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors:[{msg:'server error'}]});
    }
});

router.get('/',auth,async(req,res)=>{
    try {
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors:[{msg:'server error'}]});
    }
});



module.exports = router;