const Sequeize = require('sequelize');
const dbConfig = require('../../config/db');

const User = require('../models/User');

const connectionDB = new Sequeize(dbConfig);
User.init(connectionDB);
module.exports = connectionDB;