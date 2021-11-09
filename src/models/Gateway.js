const {Model,DataTypes}  = require('sequelize');
class Gateway extends Model {
    static init(sequelize){
        super.init({
            name:DataTypes.STRING,
            gatewayid:DataTypes.STRING,
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
        this.belongsTo(models.User,{foreignKey:'user_id', as:'user'})
    }
}

module.exports = Gateway;