'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gateways', { 
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      }, 
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:'users',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }, 
     name:{
       type:Sequelize.STRING,
       allowNull:false
     },
     gatewayid:{
       type:Sequelize.STRING,
       
     },
     lat:{
       type:Sequelize.STRING,
      
     },
     lon:{
      type:Sequelize.STRING,
      
    },
    country:{
      type:Sequelize.STRING,
      
    },
    province:{
      type:Sequelize.STRING,
      
    },
    city:{
      type:Sequelize.STRING,
     
    },
    neighborhood:{
      type:Sequelize.STRING,
      
    },
    street:{
      type:Sequelize.STRING,
      
    },
    zipcode:{
      type:Sequelize.STRING,
     
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
