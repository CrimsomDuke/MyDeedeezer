
module.exports = (app) => {
    const controller = require("../controllers/songs.controller")
    app.post('/api/songs/create', controller.postSongCreate);
    app.get('/api/songs', controller.getAllSongs);
    app.get('/api/songs/:id', controller.getSongById);
    app.get('/api/songs/album/:id', controller.getAllSongsByAlbumId)
    app.put('/api/songs/update/:id', controller.putSongUpdate)
    app.delete('/api/songs/delete/:id', controller.deleteSong)
}