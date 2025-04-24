
module.exports = (app) => {
    const controller = require("../controllers/artists.controller")

    app.get('/api/artists', controller.getAllArtists);
    app.post('/api/artists/create', controller.postArtistCreate);
    app.get('/api/artists/:id', controller.getArtistById)
    app.get('/api/artists/genre/:id', controller.getAllArtistsByGenre)
    app.put('/api/artists/update/:id', controller.putArtistUpdate)
    app.delete('/api/artists/delete/:id', controller.deleteArtist)
}