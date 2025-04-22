
const { sequelizeInst } = require('../config/db.config');

const Genres = require('./genre')(sequelizeInst);
const Albums = require('./album')(sequelizeInst);
const Artists = require('./artist')(sequelizeInst);
const Songs = require('./song')(sequelizeInst);

Genres.hasMany(Artists, {
    foreignKey : "genre_id",
    sourceKey : "id",
    as : "artists"
})

Artists.belongsTo(Genres, {
    foreignKey : "genre_id",
    targetKey : "id",
    as : "genres"
})

Artists.hasMany(Albums, {
    foreignKey : "artist_id",
    sourceKey : "id",
    as : "albums"
})

Albums.belongsTo(Artists, {
    foreignKey : "artist_id",
    targetKey : "id",
    as : "artists"
})

Albums.hasMany(Songs, {
    foreignKey : "album_id",
    sourceKey : "id",
    as : "songs"
})

Songs.belongsTo(Albums, {
    foreignKey : "album_id",
    targetKey : "id",
    as : "albums"
})

sequelizeInst.sync({
    alter : true
}).then(() => {
    console.log("Database Synced Successfully")
}).catch((err) => {
    console.error("Error Syncing the Database", err)
});

module.exports = {
    Genres,
    Albums,
    Artists,
    Songs,
    sequelizeInst,
    Sequelize : sequelizeInst.Sequelize
}