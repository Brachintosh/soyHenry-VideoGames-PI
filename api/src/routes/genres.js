const { Router } = require('express');
const { getGenres } = require('../controllers/genres');

const router = Router();

router.get('/', getGenres);

module.exports = router;