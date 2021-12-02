const {Model,DataTypes}  = require('sequelize');
class SensorAlert extends Model {
    static init(sequelize){
        super.init({
            period:DataTypes.STRING,
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Gateway,{foreignKey:'gateway_id', as:'gateway'})
    }
}

module.exports = SensorAlert;