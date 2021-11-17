const connectionDB = require('../database');
const Sensor = require('../models/Sensor');
const SensorData = require('../models/SensorData');

const socketmsg = async(msg)=>{

    console.log("ok");
    const {gatewayid,sensorid,sensorData,sensorStatus} =msg;


    try{
        let sensor = await Sensor.findOne({where:{sensorid}});
       
        if(sensor){
            const sensorDataFields ={
                sensor_id :sensor.id,
                data:JSON.stringify(sensorData),
                status:sensorStatus
            };

            const sensordata = new SensorData(sensorDataFields);

            await sensordata.save();
        }
    }catch(err){
        console.error(err.message);
    }



   
}

module.exports = socketmsg;