
module.exports = (app) => {
    const controller = require("../controllers/genres.controller")

    app.get('/api/genres', controller.getGenres);
    app.post('/api/genres/create', controller.postGenreCreate);
    app.get('/api/genres/:id', controller.getGenreById)
    app.put('/api/genres/update/:id', controller.putGenreUpdate)
    app.delete('/api/genres/delete/:id', controller.deleteGenre)
}