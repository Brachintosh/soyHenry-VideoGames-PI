const  { Router } = require('express');
const{ getPlatforms } = require('../controllers/platforms.js');

const router = Router();

router.get('/', getPlatforms);

module.exports = router;