
const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
    const Genres = sequelize.define('Genres', {
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
        banner_path : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    });

    return Genres;
}