const Sequeize = require('sequelize');
const dbConfig = require('../../config/db');
const Gateway = require('../models/Gateway');
const User = require('../models/User');
const Sensor = require('../models/Sensor');
const Sensordata = require('../models/SensorData');

const connectionDB = new Sequeize(dbConfig);
User.init(connectionDB);
Gateway.init(connectionDB);
Sensor.init(connectionDB);
Sensordata.init(connectionDB);

Gateway.associate(connectionDB.models);
Sensor.associate(connectionDB.models);
Sensordata.associate(connectionDB.models);

module.exports = connectionDB;