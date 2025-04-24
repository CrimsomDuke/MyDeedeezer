

const db = require("../models/")
const global_vars = require("../config/global.vars")
const path = require('path');

exports.getAllArtists = async (req, res) => {
    const artists = await db.Artists.findAll();
    if (artists.length === 0) {
        return res.status(404).json({ message: "No artists found" });
    }
    return res.status(200).json(artists);
}

exports.getArtistById = async (req, res) => {
    const artistId = req.params.id;
    const artist = await db.Artists.findByPk(artistId);

    if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
    }

    return res.status(200).json(artist);
}

exports.getAllArtistsByGenre = async (req, res) => {
    const genreId = req.params.id;
    const artists = await db.Artists.findAll({
        where: {
            genre_id: genreId
        }
    });

    if (artists.length === 0) {
        return res.status(404).json({ message: "No artists found for this genre" });
    }

    return res.status(200).json(artists);

}

exports.postArtistCreate = async (req, res) => {
    const errors = validateArtistRequest(req);
    if (errors) {
        return res.status(400).json(errors);
    }

    const { name, genre_id } = req.body;
    console.log(name);

    if(!req.files?.picture) {
        return res.status(400).json({ error : { message: "Picture is required" }});
    }

    const artistSaved = await db.Artists.create({
        name: name,
        genre_id: genre_id,
        picture_path: "https://placehold.co/600x400" //placeholder
    });
    if (!artistSaved) {
        return res.status(500).json({ message: "Error saving the artist" });
    }

    const picture = req.files.picture;
    const fileName = `${artistSaved.id}_.jpg`;
    const thePath = path.join(global_vars.upload_folder, "/images/artists/", fileName);

    console.log("The path: ", thePath);

    picture.mv(thePath, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving the image" });
        }

        //update the artist with the image
        artistSaved.picture_path = thePath;
        await db.Artists.update({
            picture_path: artistSaved.picture_path
        }, { where : { id : artistSaved.id}});

        return res.status(200).json({ message: "Artist created successfully", artist: artistSaved });
    });
}

exports.putArtistUpdate = async (req, res) => {

    const artistId = req.params.id;
    const { name } = req.body;

    if(!name){
        return res.status(400).json({ error : { name : "Name is required" }});
    }

    const artist = await db.Artists.findByPk(artistId);

    if(!artist) {
        return res.status(404).json({ message: "Artist not found" });
    }

    artist.name = name;

    if(!req.files?.picture){
        await artist.save();
        return res.status(200).json({ message: "Artist updated successfully", artist: artist });
    }

    const picture = req.files.picture;
    const fileName = `${artist.id}_.jpg`;
    const thePath = path.join(global_vars.upload_folder, "/images/artists/", fileName);

    console.log("The path: ", thePath);

    picture.mv(thePath, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving the image" });
        }

        //update the artist with the image
        artist.picture_path = thePath;

        await artist.save();
        return res.status(200).json({ message: "Artist created successfully", artist: artist });
    });
}

exports.deleteArtist = async (req, res) => {
    const artistId = req.params.id;
    const artist = await db.Artists.findByPk(artistId);

    if (!artist){
        return res.status(404).json({ message : "Artist not found" })
    }

    await db.Artists.destroy({
        where : { id : artistId }
    })

    return res.status(200).json({ message : "Artist deleted successfully" })
}

const validateArtistRequest = (req) => {
    if (!req.body.name) {
        return { error : { message : "Name is required" } };
    }

    let errors = {}

    const { name, genre_id } = req.body;
    if (!name){
        errors.name = "Name is required for the artist"
    }

    if(!genre_id){
        errors.genre_id = "Genre ID is required for the artist"
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    return null;

}