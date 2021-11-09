const express = require('express');
const {body,validationResult} = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/new',[
    body('name','name is required').trim().not().isEmpty(),
    body('email','email not valid').isEmail(),
    body('password','please enter a password with six or more charctrs').isLength({min:6})
],async(req,res)=>{

    const errors =  validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({msg:errors.array()});

    const {name,email,password} = req.body;

    try {
    
        let user = await User.findOne({where:{email}});
        
    
        if(user)
            return res.status(500).json({msg:'email already exists'});

       
       
        const salt = await bcrypt.genSalt(10);
        const cryptPassword = await bcrypt.hash(password,salt);
     
        user = await User.create({name:name,email:email,password:cryptPassword});

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
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'server error'});
        
    }

});



module.exports = router;