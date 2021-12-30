'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensor_sensibilities', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      }, 
      sensor_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:'sensors',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }, 
      data:{
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
    
     await queryInterface.dropTable('sensor_sensibilities');
     
  }
};