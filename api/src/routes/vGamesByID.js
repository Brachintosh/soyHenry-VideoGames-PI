const { API_KEY } = process.env;
const{ default: axios } = require('axios');
const{ Videogame, Genre, Platform } = require('../db');
const { Router } = require('express');

const router = Router();

router.get('/:id', async(req, res) => {

    const {id} = req.params;
    
    try {
        // Busco en DB:
        if (id.includes('-')){
        const gameDB = await Videogame.findOne({
            where:{id},
            include:[Genre, Platform],
        });
        // console.log("Soy GameDB by ID >>> ", gameDB)
        return res.json(gameDB);
        }

        // Sino está en DB, busco en API:
    const gameAPI = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
        // console.log("Soy API-Game by ID >>> ", gameAPI.data)
        res.json(gameAPI.data);
        
        } catch (err){    
        res.status(404).json({error:'ID not found.'});
    }
});

module.exports = router;