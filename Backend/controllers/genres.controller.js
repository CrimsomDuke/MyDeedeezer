
const db = require("../models/")
const global_vars = require("../config/global.vars")
const path = require('path');

exports.getGenres = async (req, res) => {
    const genres = await db.Genres.findAll()
    if (genres.length === 0) {
        return res.status(404).json({ message: "No genres found" });
    }
    return res.status(200).json(genres);
}

exports.postPersonaCreate = async (req, res) => {
    const errors = validateGenreRequest(req)
    if (errors) {
        return res.status(400).json(errors)
    }

    const { name } = req.body

    const genreSaved = await db.Genres.create({
        name : name,
        banner_path : "https://placehold.co/600x400" //placeholder
    })
    if (!genreSaved) {
        return res.status(500).json({ message : "Error saving the genre" })
    }

    const image = req.files.banner
    const fileName = `${genreSaved.id}_.jpg`
    const thePath = path.join(global_vars.upload_folder, "/images/genres/", fileName)

    console.log("The path: ", thePath)

    image.mv(thePath, async (err) => {
        if (err) {
            return res.status(500).json({ message : "Error saving the image" })
        }

        //update the genre with the iamge
        genreSaved.banner_path = thePath;
        await db.Genres.update({
            banner_path : genreSaved.banner_path
        },{
            where : { id : genreSaved.id }
        })

        return res.status(200).json({ message : "Genre created successfully", genre : genreSaved })
    })

}

const validateGenreRequest = (req) => {
    if (!req.body){
        return { error : { message : "Request body empty for Genre" } }
    }

    const { name } = req.body
    const errors = {}

    if (!req.files?.banner){
        errors.banner = "banner is required"
    }
    if (!name) {
        errors.name = "Name for genre is required"
    }

    if (Object.keys(errors).length > 0) {
        return { error : errors }
    }
    return null
}