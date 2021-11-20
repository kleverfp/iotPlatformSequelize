

const Gateway = require('../models/Gateway');


const FindGateway = async(gatewayid) =>{
    try {
        console.log("find",gatewayid);
        const result =  await Gateway.findOne({where:{gatewayid}});
        return result;

    } catch (error) {
        
    }
}

module.exports =FindGateway