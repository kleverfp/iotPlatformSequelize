'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensor_alerts', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      }, 
      gateway_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:'gateways',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }, 
      period:{
        type:Sequelize.STRING,
        allowNull:false
      },
     created_at:{
       type:Sequelize.DATE,
       allowNull:false
     },
     updated_at:{
       type:Sequelize.DATE,
       allowNull:false
     }
     });
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('sensor_alerts');
     
  }
};