
const db = require('../models/');
const gloval_vars = require('../config/global.vars');
const path = require('path');

exports.getAllAlbums = async (req, res) => {
    const albums = await db.Albums.findAll();
    if (albums.length === 0) {
        return res.status(404).json({ message: 'No albums found' });
    }
    return res.status(200).json(albums);
}

exports.getAlbumById = async (req, res) => {
    const albumId = req.params.id;
    const album = await db.Albums.findByPk(albumId);

    if (!album) {
        return res.status(404).json({ message: 'Album not found' });
    }
    return res.status(200).json(album);
}

exports.getAllAlbumsByArtistId = async (req, res) => {
    const artistId = req.params.id;
    const albums = await db.Albums.findAll({
        where: {
            artist_id: artistId
        },
        include : ['songs']
    });

    if (albums.length === 0) {
        return res.status(404).json({ message: 'No albums found for this artist' });
    }

    return res.status(200).json(albums);
}

exports.postAlbumCreate = async (req, res) => {
    const errors = validateAlbumRequest(req);
    if (errors) {
        return res.status(400).json(errors);
    }

    const { album_name, artist_id } = req.body;
    console.log(album_name);

    if (!req.files?.picture) {
        return res.status(400).json({ error: { message: 'picture is required' } });
    }

    const albumSaved = await db.Albums.create({
        album_name: album_name,
        artist_id: artist_id,
        picture_path: 'https://placehold.co/600x400' //placeholder
    });
    if (!albumSaved) {
        return res.status(500).json({ error: { message: 'Error saving album' } });
    }

    const picture = req.files.picture;
    const fileName = `${albumSaved.id}_.jpg`;
    const thePath = path.join(gloval_vars.upload_folder, "/images/albums/", fileName);

    picture.mv(thePath, async (err) => {
        if (err) {
            console.error('Error saving picture:', err);
            return res.status(500).json({ error: { message: 'Error saving picture' } });
        }

        albumSaved.picture_path = fileName;
        await albumSaved.save();
        
        return res.status(201).json(albumSaved);
    });
}

exports.putAlbumUpdate = async (req, res) => {
    const albumId = req.params.id;
    const album = await db.Albums.findByPk(albumId);

    if (!album) {
        return res.status(404).json({ message: 'Album not found' });
    }

    const { album_name } = req.body;
    if (!album_name) {
        return res.status(400).json({ error: { message: 'Name is required' } });
    }

    album.album_name = album_name;

    if (!req.files?.picture) {
        await album.save();
        return res.status(200).json(album);
    }

    const picture = req.files.picture;
    const fileName = `${album.id}_.jpg`;
    const thePath = path.join(gloval_vars.upload_folder, "/images/albums/", fileName);

    picture.mv(thePath, async (err) => {
        if (err) {
            console.error('Error saving picture:', err);
            return res.status(500).json({ error: { message: 'Error saving picture' } });
        }

        album.picture_path = fileName;
        await album.save();

        return res.status(200).json(album);
    });
}

exports.deleteAlbum = async (req, res) => {
    const albumId = req.params.id;
    const album = await db.Albums.findByPk(albumId);

    if (!album) {
        return res.status(404).json({ message: 'Album not found' });
    }

    await album.destroy();
    return res.status(200).json({ message: 'Album deleted successfully' });
}

const validateAlbumRequest = (req) => {
    if (!req.body.album_name) {
        return { error: { message: 'Data required' } };
    }

    let errors = {}

    const { album_name, artist_id } = req.body;
    if (!album_name) {
        errors.name = "Name is required";
    }
    if (!artist_id) {
        errors.artist_id = "Artist ID is required";
    }

    if (Object.keys(errors).length > 0) {
        return { error: errors };
    }
    return null;
}