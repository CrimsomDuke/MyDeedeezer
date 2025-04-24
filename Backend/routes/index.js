
module.exports = (app) => {
    require("./genres.routes")(app);
    require("./artists.routes")(app);
    require("./album.routes")(app);
    require("./songs.routes")(app);
}