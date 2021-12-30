const {Model,DataTypes}  = require('sequelize');
class sensor_sensibility extends Model {
    static init(sequelize){
        super.init({
            data:DataTypes.STRING
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Sensor,{foreignKey:'sensor_id', as:'sensor'})
    }
}

module.exports = sensor_sensibility;