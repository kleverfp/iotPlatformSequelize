const Sequeize = require('sequelize');
const dbConfig = require('../../config/db');
const Gateway = require('../models/Gateway');
const User = require('../models/User');
const Sensor = require('../models/Sensor');
const Sensordata = require('../models/SensorData');
const sensor_alerts = require('../models/SensorAlert');

const connectionDB = new Sequeize(dbConfig);
User.init(connectionDB);
Gateway.init(connectionDB);
Sensor.init(connectionDB);
Sensordata.init(connectionDB);
sensor_alerts.init(connectionDB);

Gateway.associate(connectionDB.models);
Sensor.associate(connectionDB.models);
Sensordata.associate(connectionDB.models);
sensor_alerts.associate(connectionDB.models);

module.exports = connectionDB;