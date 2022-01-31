const  { Router } = require('express');
const { getAllVgames } = require('../controllers/videogames.js');

const router = Router();

router.get('/', async(req, res) => {
    // Busqueda de videogames y por nombre:
    const name = req.query.name;

    let vGamesTotal = await getAllVgames();

    if(name){
        let vGameName = await vGamesTotal.filter(vgn => vgn.name.toLowerCase().includes(name.toLocaleLowerCase()));
        vGameName.length ? res.status(200).send(vGameName) : res.status(404).send('Videogame not found.');
    } else {
        res.status(200).send(vGamesTotal);
    }

});

module.exports = router; 