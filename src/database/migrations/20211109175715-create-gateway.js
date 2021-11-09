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
       allowNull:false
     },
     lat:{
       type:Sequelize.STRING,
       allowNull:false
     },
     lon:{
      type:Sequelize.STRING,
      allowNull:false
    },
    country:{
      type:Sequelize.STRING,
      allowNull:false
    },
    province:{
      type:Sequelize.STRING,
      allowNull:false
    },
    city:{
      type:Sequelize.STRING,
      allowNull:false
    },
    neighborhood:{
      type:Sequelize.STRING,
      allowNull:false
    },
    street:{
      type:Sequelize.STRING,
      allowNull:false
    },
    zipcode:{
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
