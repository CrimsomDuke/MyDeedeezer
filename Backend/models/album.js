
const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
    const Albums = sequelize.define('Albums', {
        id : {
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        album_name : {
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
        artist_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });

    return Albums;
}