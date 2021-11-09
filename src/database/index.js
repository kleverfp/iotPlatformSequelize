const Sequeize = require('sequelize');
const dbConfig = require('../../config/db');
const Gateway = require('../models/Gateway');
const User = require('../models/User');

const connectionDB = new Sequeize(dbConfig);
User.init(connectionDB);
Gateway.init(connectionDB);

Gateway.associate(connectionDB.models);

module.exports = connectionDB;