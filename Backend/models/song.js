
const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
    const Songs = sequelize.define('Songs', {
        id : {
            primaryKey : true,
            type : DataTypes.INTEGER,
            autoIncrement : true
        },
        song_name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate: {
                len : [3, 50]
            }
        },
        file_path : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        album_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });

    return Songs;
}