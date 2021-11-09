const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findOne({where:{id:req.user.id},attributes:['name','email']});
        if(user)
           return res.json(user);

    } catch (err) {
        console.log(err.message);
        res.send(500).json({msg:'server error'});
    }
});

router.post('/',[
    body('email','invalid email').isEmail(),
    body('password','password is required').exists()
], async(req,res)=>{

    const {email,password} = req.body;

    const errors =  validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({msg:errros.array()});

    try{
    const user = await User.findOne({where: {email}});

    if(!user)
        return res.status(400).json({errors:[{msg:'email or password are incorrects'}]});


    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
        return res.status(400).json({errors:[{msg:'email or password are incorrects'}]});


    const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:3600
    },(err,token)=>{
        if(err) throw err;
        res.json({token});

    });

    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'bad request'});
    }

    

});



module.exports = router;