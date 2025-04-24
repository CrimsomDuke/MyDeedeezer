
module.exports = (app) => {
    const controller = require("../controllers/albums.controller")

    app.get('/api/albums', controller.getAllAlbums);
    app.post('/api/albums/create', controller.postAlbumCreate);
    app.get('/api/albums/:id', controller.getAlbumById)
    app.get('/api/albums/artist/:id', controller.getAllAlbumsByArtistId)
    app.put('/api/albums/update/:id', controller.putAlbumUpdate)
    app.delete('/api/albums/delete/:id', controller.deleteAlbum)
}