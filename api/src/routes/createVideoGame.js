const { Router } = require('express');
const { Videogame, Platform, Genre } = require('../db');

const router = Router();

router.post('/', async(req, res) => {

    try {
        
        let {
            name, description, background_image, releaseDate,
            rating, created_inDB, platforms, genres
        } = req.body;

        let vGameCreated = await Videogame.create({
            name, description, background_image,
            releaseDate, rating, created_inDB
        });

        let genreDB = await Genre.findAll({
            where: {name: genres}
        });

        let platformDB = await Platform.findAll({
            where: {name: platforms}
        });

        vGameCreated.addGenre(genreDB);
        vGameCreated.addPlatform(platformDB);

        // console.log("soy vGameCreated >>>", vGameCreated);

        res.status(200).json(vGameCreated)

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;