const express = require('express');
const {body,validationResult} = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const Gateway = require('../models/Gateway');
const auth = require('../middleware/auth');



router.get('/:gatewayId',async(req,res)=>{
    try {
        const gateway = await Gateway.findOne( {
            where:{ gatewayId:req.params.gatewayId},
            attributes:['name','gatewayId','lon','lat','country','province','city','street','neighborhood','zipCode']});

        if(!gateway)
            return res.status(400).json({msg:'gateway not found'});
        
        return res.json(gateway);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:'server error'});
    }
});

router.post('/new',auth,[
    body('name','gateway name is required').trim().not().isEmpty(),
    body('gatewayId','gatewayId is required').trim().not().isEmpty()

],async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({msg:errors.array()});

    const {name,gatewayId,lon,lat,country,province,city,neighborhood,street,zipCode} = req.body;
 
    try{
        console.log(req.user.id);
        let gateway = await Gateway.findAll({where:{user_id:req.user.id}});
        
        const msgError =[];
        const gatewayName = gateway.map((gtway)=>gtway.name).indexOf(name);
       
        if(gatewayName >= 0)
            msgError.push({error:'name already existis'});
        
        const gatewayExistId = gateway.map((gtway)=>gtway.gatewayId).indexOf(gatewayId);

        if(gatewayExistId  >= 0)
            msgError.push({error:'gatewayId already existis'});

        if(msgError.length > 0)
            return res.status(400).json({msg:msgError});

        const gatewayFields ={};

        gatewayFields.user_id = req.user.id;
        gatewayFields.name = name;
        gatewayFields.gatewayid = gatewayId;
        gatewayFields.gps ={};
        if(lon)gatewayFields.lon = lon;
        if(lat)gatewayFields.lat =lat;
        if(country)gatewayFields.country =country;
        if(province)gatewayFields.province =province;
        if(city)gatewayFields.city =city;
        if(neighborhood)gatewayFields.neighborhood =neighborhood;
        if(street)gatewayFields.street = street;
        if(zipCode)gatewayFields.zipcode = zipCode;

        gateway = new Gateway(gatewayFields);

        await gateway.save();
        res.json({msg:'gateway created'});

    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'server error'});
    }
});

router.delete('/:gatewayId',auth,async(req,res)=>{
    try {
        const gateway = await Gateway.findOne({where:{gatewayid:req.params.gatewayId}});
        
        if(!gateway)
            return res.status(400).json({msg:'no gateway find'});

        await Gateway.destroy({where:{id:gateway.id}});

        res.json({gateway})

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:'server error'});
    }
});



module.exports= router;