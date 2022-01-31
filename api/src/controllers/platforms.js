const axios = require('axios');
const { Platform } = require('../db');
const { API_KEY } = process.env;
const { URL_API } = 'https://api.rawg.io/api/platforms'

const getPlatforms = async(req, res) => {

    try {
        
        const platformsAPI = await axios.get(`${URL_API}?key=${API_KEY}`);
        console.log("Soy platformsAPI >>> ", platformsAPI.data.results);

        const platforms = platformsAPI.data.results;
        platforms.forEach(async (p) => {
            await Platform.findOrCreate({
                where: {
                    name: p.name,
                },
            });
        });

        const platformDB = await Platform.findAll();

        console.log("Soy platformDB >>> ", platformDB);
        res.status(200).json(platformDB);

    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    getPlatforms,
};