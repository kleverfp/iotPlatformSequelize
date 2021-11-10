'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensors', { 
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
     name:{
       type:Sequelize.STRING,
       allowNull:false
     },
     communication:{
      type:Sequelize.STRING,
      allowNull:false
    },
    type:{
      type:Sequelize.STRING,
      allowNull:false
    },
     sensorid:{
       type:Sequelize.STRING,
       allowNull:false
     },
     lat:{
       type:Sequelize.STRING,
       allowNull:true
     },
     lon:{
      type:Sequelize.STRING,
      allowNull:true
    },
    country:{
      type:Sequelize.STRING,
      allowNull:true
    },
    province:{
      type:Sequelize.STRING,
      allowNull:true
    },
    city:{
      type:Sequelize.STRING,
      allowNull:true
    },
    neighborhood:{
      type:Sequelize.STRING,
      allowNull:true
    },
    street:{
      type:Sequelize.STRING,
      allowNull:true
    },
    zipcode:{
      type:Sequelize.STRING,
      allowNull:true
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
    
     await queryInterface.dropTable('sensors');
     
  }
};