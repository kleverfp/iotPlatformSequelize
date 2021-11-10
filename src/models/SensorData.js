const {Model,DataTypes}  = require('sequelize');
class Sensordata extends Model {
    static init(sequelize){
        super.init({
            data:DataTypes.STRING,
            status:DataTypes.STRING
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Sensor,{foreignKey:'sensor_id', as:'sensor'})
    }
}

module.exports = Sensordata;