const connectionDB = require('../database');

const GetSensorData = async(gatewayid) =>{
    try {
       
        const [results,metadata] = await connectionDB.query(`select sensorid,name,sdmres.status,sdmres.data,sdmres.created_at from sensors left join(select sd.sensor_id,sd.created_at,sd.status,sd.data from sensordata sd inner join (select sensor_id,max(created_at) as MaxDate from sensordata group by sensor_id) sdm on sd.sensor_id = sdm.sensor_id and sd.created_at = sdm.MaxDate)sdmres on sensors.id=sdmres.sensor_id where gateway_id = "${gatewayid}";`);
        return results;

    } catch (error) {
        console.error(error.message);
    }
}

module.exports =GetSensorData