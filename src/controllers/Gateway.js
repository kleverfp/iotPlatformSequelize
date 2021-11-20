const Gateway = require('../models/Gateway');

const FindGateway = async(gatewayid) =>{
    try {
        
        const result =  await Gateway.findOne({where:{gatewayid}});
        return result;

    } catch (error) {
        console.error(error.message);
    }
}

module.exports =FindGateway