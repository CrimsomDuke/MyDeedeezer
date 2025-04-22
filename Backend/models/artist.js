
const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
    const Artists = sequelize.define('Artists', {
        id : {
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate: {
                len : [3, 50]
            }
        },
        picture_path : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        genre_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });

    return Artists;
}