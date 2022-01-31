const { Router } = require('express');
// Importar todos los routers:
const vGamesRoute = require('./videogames.js');
const genresRoute = require('./genres.js');
const vGamesByID_Route = require('./vGamesByID.js');
const platformRoute = require('./platforms.js');
const create = require('./createVideoGame.js');

const router = Router();

// Configurar los routers:
router.use('/videogames', vGamesRoute);
router.use('/genres', genresRoute);
router.use('/videogame', vGamesByID_Route) ;
router.use('/platform', platformRoute);
router.use('/videogames', create);

module.exports = router;
