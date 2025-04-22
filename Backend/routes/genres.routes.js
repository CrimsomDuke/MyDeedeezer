
module.exports = (app) => {
    const controller = require("../controllers/genres.controller")

    app.get('/api/genres', controller.getGenres);
    app.post('/api/genres', controller.postPersonaCreate);
}