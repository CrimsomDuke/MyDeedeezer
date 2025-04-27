
const db = require("../models/");
const global_vars = require("../config/global.vars");
const path = require("path");

exports.getSongById = async (req, res) => {
    const songId = req.params.id;
    const song = await db.Songs.findByPk(songId);

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }
    return res.status(200).json(song);
}

exports.getAllSongsByAlbumId = async (req, res) => {
    const albumId = req.params.id;
    const songs = await db.Songs.findAll({
        where: {
            album_id: albumId
        }
    });

    if (songs.length === 0) {
        return res.status(404).json({ message: "No songs found for this album" });
    }

    return res.status(200).json(songs);
}

exports.postSongCreate = async (req, res) => {
    const errors = validateSongRequest(req);
    if (errors) {
        return res.status(400).json(errors);
    }

    const { song_name, album_id } = req.body;
    console.log(song_name);

    if (!req.files?.song) {
        return res.status(400).json({ error: { message: "song is required" } });
    }

    const songSaved = await db.Songs.create({
        song_name: song_name,
        album_id: album_id,
        file_path: "https://placehold.co/600x400" //placeholder
    });
    if (!songSaved) {
        return res.status(500).json({ error: { message: "Error saving song" } });
    }

    const file = req.files.song;
    //get the audio extension
    const fileExtension = path.extname(file.name);
    const fileName = songSaved.id + fileExtension;
    const filePath = path.join(global_vars.upload_folder, "/songs/", fileName);

    file.mv(filePath, async (err) => {
        if (err) {
            return res.status(500).json({ error: { message: "Error saving song file" } });
        }

        songSaved.file_path = fileName;
        await songSaved.save();

        return res.status(201).json({ message : "Song created successfully", song: songSaved });
    });
}

exports.putSongUpdate = async (req, res) => {
    const songId = req.params.id;
    const song = await db.Songs.findByPk(songId);

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    const { song_name } = req.body;
    
    if (!song_name) {
        return res.status(400).json({ error: { message: "song_name is required" } });
    }

    song.song_name = song_name;

    if(!req.files?.song) {
        await song.save();
        return res.status(200).json(song);
    }

    const file = req.files.song;
    //get the audio extension
    const fileExtension = path.extname(file.name);
    const fileName = song.id + fileExtension;
    const filePath = path.join(global_vars.upload_folder, "/songs/", fileName);

    file.mv(filePath, async (err) => {
        if (err) {
            return res.status(500).json({ error: { message: "Error saving song file" } });
        }
        song.file_path = fileName;
        await song.save();

        return res.status(200).json(song);
    })
}

exports.deleteSong = async (req, res) => {
    const songId = req.params.id;
    const song = await db.Songs.findByPk(songId);

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    await song.destroy();
    return res.status(200).json({ message: "Song deleted successfully" });
}

const validateSongRequest = (req) => {
    const errors = { error: {} };
    if (!req.body.song_name) {
        errors.error.song_name = "song_name is required";
    }
    if (!req.body.album_id) {
        errors.error.album_id = "album_id is required";
    }
    if (Object.keys(errors.error).length > 0) {
        return errors;
    }
    return null;
}