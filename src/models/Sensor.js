const {Model,DataTypes}  = require('sequelize');
class Sensor extends Model {
    static init(sequelize){
        super.init({
            name:DataTypes.STRING,
            sensorid:DataTypes.STRING,
            communication:DataTypes.STRING,
            type:DataTypes.STRING,
            lat:DataTypes.STRING,
            lon:DataTypes.STRING,
            country:DataTypes.STRING,
            province:DataTypes.STRING,
            city:DataTypes.STRING,
            neighborhood:DataTypes.STRING,
            street:DataTypes.STRING,
            zipcode:DataTypes.STRING
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Gateway,{foreignKey:'gateway_id', as:'gateway'})
    }
}

module.exports = Sensor;